use crate::Client;
use reywen::structures::authentication::{login::ResponseLogin, mfa::MFAResponse};

/// Session friendly name to be used for login.
macro_rules! session_friendly_name {
    () => {{
        #[cfg(any(target_os = "ios", target_os = "android"))]
        const APP_NAME: &str = "Jolt mobile client";
        #[cfg(not(any(target_os = "ios", target_os = "android")))]
        const APP_NAME: &str = "Jolt desktop client";

        #[cfg(target_os = "windows")]
        const PLATFORM: &str = "Windows";

        #[cfg(target_os = "darwin")]
        const PLATFORM: &str = "macOS";

        #[cfg(target_os = "linux")]
        const PLATFORM: &str = "Linux";

        #[cfg(not(any(target_os = "windows", target_os = "darwin", target_os = "linux")))]
        const PLATFORM: &str = "Unknown Device";

        format!("{APP_NAME} on {PLATFORM}")
    }};
}

/// Log user in.
///
/// # Errors
///
/// This function will return an error if login fails or the account is disabled.
#[tauri::command]
pub async fn login(
    client: tauri::State<'_, Client>,
    email: &str,
    password: &str,
    mfa_response: Option<MFAResponse>,
) -> Result<ResponseLogin, String> {
    match reywen::client::Client::session_login_smart(
        email,
        password,
        mfa_response,
        Some(&session_friendly_name!()),
    )
    .await
    .map_err(|error| format!("{error:?}"))?
    {
        ResponseLogin::Success(session) => {
            login_with_token(client, &session.token).await?;

            Ok(ResponseLogin::Success(session))
        }
        response => Ok(response),
    }
}

/// Login with session token.
#[tauri::command]
pub async fn login_with_token(client: tauri::State<'_, Client>, token: &str) -> Result<(), String> {
    *client.driver.write().await =
        reywen::client::Client::from_token(token, false).map_err(|err| format!("{err:?}"))?;

    Ok(())
}