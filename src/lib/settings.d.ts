type Settings = {
	ordering: { servers?: string[] };
	'jolt:low-data-mode': boolean;
	'jolt:compact-mode': boolean;
	'jolt:send-typing-indicators': boolean;
	'jolt:receive-typing-indicators': boolean;
};

type SettingsSection =
	| {
			readonly type: 'link';
			readonly title: string;
			readonly id: string;
	  }
	| {
			readonly type: 'header';
			title: string;
	  };
