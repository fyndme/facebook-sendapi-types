export interface MessengerQuickReply {
  content_type: string,
  title: string,
  payload: string,
}

export interface MessengerPostbackButton {
  type: 'postback';
  title: string;
  payload: string;
}

export interface MessengerButton {
  type: 'postback' | 'web_url';
  title: string;
  payload?: string;
  url?: string;
  webview_height_ratio?: 'compact' | 'tall' | 'full';
  messenger_extensions?: boolean;
}

export interface MessengerItem {
  title: string,
  subtitle?: string,
  image_url?: string,
  buttons?: Array<MessengerButton>,
}

export interface MessengerImageAttachment {
  type: "image";
  payload: {
    url: string;
  };
}

export interface MessengerAudioAttachment {
  type: "audio";
  payload: {
    url: string;
  };
}

export interface MessengerVideoAttachment {
  type: "video";
  payload: {
    url: string;
  };
}

export interface MessengerFileAttachment {
  type: "file";
  payload: {
    url: string;
  };
}

export interface MessengerTextMessage {
  text: string,
}

export interface MessengerGenericPayload {
  template_type: "generic",
  elements: Array<MessengerItem>,
}

export interface MessengerButtonPayload {
  template_type: "button",
  text: string,
  buttons: Array<MessengerButton>,
}

export type MessengerTemplatePayload = MessengerGenericPayload | MessengerButtonPayload;

export interface MessengerTemplateAttachement {
  type: "template";
  payload: MessengerTemplatePayload;
}

export type MessengerAttachement = MessengerTemplateAttachement | MessengerImageAttachment | MessengerAudioAttachment | MessengerVideoAttachment | MessengerFileAttachment;

export interface MessengerMessage {
  attachment?: MessengerAttachement
  text?: string,
  quick_replies?: Array<MessengerQuickReply>,
  metadata?: string,
}

export type NotificationType = 'REGULAR' | 'SILENT_PUSH' | 'NO_PUSH';
export type SenderAction = 'mark_seen' | 'typing_on' | 'typing_off';
export interface MessengerPayload {
  recipient: {
    id?: string;
    phone_number?: string;
  };
  message?: MessengerMessage;
  sender_action?: SenderAction;
  notification_type?: NotificationType;
}

export interface MessengerResponse {
  recipient_id: string,
  message_id: string,
}

export interface EchoFields {
  is_echo?: boolean;
  attachments?: Array<MessengerAttachement>;
  quick_reply?: {
    payload: null;
  };
}

export interface WebhookMessageFields {
  mid: string;
  seq: number;
  metadata?: string;
  app_id?: string;
}

export interface WebhookPayloadFields {
  sender: {
    id: string;
  };
  timestamp: number;
  message?: WebhookMessageFields & EchoFields;
  postback?: {
    payload: string;
  };
  read?: {
    seq: number;
    watermark: number;
  };
  delivery?: {
    seq: number;
    mids: Array<string>;
    watermark: number;
  };
}

export type WebhookPayload = WebhookPayloadFields & MessengerPayload;

export interface MessengerError {
  error: {
    message: string,
    type: string,
    code: Number,
    fbtrace_id: string,
  },
}

export interface FacebookUser {
  first_name: string;
  last_name: string;
  profile_pic: string;
  locale: string;
  timezone: number;
  gender: string;
}

export interface MessengerPostback {
  payload: string,
}

export interface PersistentMenu {
  setting_type: 'call_to_actions';
  thread_state: 'existing_thread';
  call_to_actions: Array<MessengerButton>;
}

export interface GeneralThreadSettings {
  setting_type: string,
  thread_state?: string,
  call_to_actions?: Array<MessengerPostback> | Array<MessengerButton>,
  greeting?: {
    text: string,
  },
}

export type MessengerSettings = PersistentMenu | GeneralThreadSettings;

export interface WebhookCallback {
  object: 'page';
  entry: Array<{
    id: string;
    time: number;
    messaging: Array<WebhookPayload>;
  }>;
}
