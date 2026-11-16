export type PersonalityId =
  | 'debochado'
  | 'ciumento'
  | 'sofrido'
  | 'frio'
  | 'ressentido'
  | 'arrependido'
  | 'narcisista';

export interface Personality {
  id: PersonalityId;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  exampleUser: string;
  exampleAi: string;
  avatarBg: string;
  statusText: string;
  badge: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ex';
  text: string;
  timestamp: string;
  personalityId: PersonalityId;
  reaction?: string;
}

export type ResponseStyle = 'debochada' | 'venenosa' | 'elegante';

export interface GeneratedOption {
  style: ResponseStyle;
  label: string;
  emoji: string;
  description: string;
  response: string;
  color: string;
}

export interface ShareCardData {
  userMessage?: string;
  exResponse: string;
  personalityName: string;
  personalityEmoji: string;
  timestamp?: string;
  format: 'stories' | 'feed';
  styleTag?: string;
}
