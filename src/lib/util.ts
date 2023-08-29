import { invoke } from '@tauri-apps/api';
import { _ } from 'svelte-i18n';
import { get } from 'svelte/store';

export const AUTUMN_URL = 'https://autumn.revolt.chat';
export const API_URL = 'https://api.revolt.chat';

export function getAutumnURL(file: AutumnFile): string {
	return `${AUTUMN_URL}/${file.tag}/${file._id}`;
}

export function getDefaultUserAvatar(user_id: string): string {
	return `${API_URL}/users/${user_id}/default_avatar`;
}

export function getDisplayName(user?: User, member?: Member, message?: Message): string {
	if (message?.system == undefined) {
		return (
			message?.masquerade?.name ??
			member?.nickname ??
			user?.display_name ??
			user?.username ??
			`<${get(_)('user.unknown')}>`
		);
	}

	return get(_)('message.system');
}

export function getDisplayAvatar(user?: User, member?: Member, message?: Message): string {
	if (member?.avatar != undefined) {
		return getAutumnURL(member.avatar);
	}

	if (message?.masquerade?.avatar != undefined) {
		return message.masquerade.avatar;
	}

	if (user?.avatar == undefined) {
		return user == undefined ? '/user.svg' : getDefaultUserAvatar(user._id);
	} else {
		return getAutumnURL(user?.avatar);
	}
}

export async function getChannelName(channel: Channel, user_id?: string): Promise<string> {
	if (
		channel.channel_type == 'TextChannel' ||
		channel.channel_type == 'VoiceChannel' ||
		channel.channel_type == 'Group'
	) {
		return `#${channel.name}`;
	}

	if (channel.channel_type == 'SavedMessages') {
		return get(_)('channel.notes');
	}

	const user = await fetchUser(
		channel.recipients[0] == user_id ? channel.recipients[1] : channel.recipients[0]
	);

	return `@${getDisplayName(user)}`;
}

export function fetchUser(user_id: string): Promise<User> {
	return invoke<User>('fetch_user', { user_id });
}

export function fetchChannel(channel_id: string): Promise<Channel> {
	return invoke<Channel>('fetch_channel', { channel_id });
}

export function fetchServer(server_id: string): Promise<Server> {
	return invoke<Server>('fetch_server', { server_id });
}

export function fetchMembersList(server_id: string): Promise<MemberResponseAll> {
	return invoke<MemberResponseAll>('fetch_members', { server_id });
}
