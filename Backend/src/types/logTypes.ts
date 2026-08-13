import { Schema, model, Document, Types } from 'mongoose';

export const LOG_CATEGORIES = ['Mindfulness', 'Movement', 'Nutrition'] as const;
export type LogCategory = (typeof LOG_CATEGORIES)[number];

export interface LogEntry extends Document {
  userId: Types.ObjectId;
  energyLevel: number;
  moodLevel: number;
  sleepLevel: number;
  category: LogCategory;
  note?: string;
  created_at: Date;
  updated_at: Date;
}

export interface LogInput {
  energyLevel: number;
  moodLevel: number;
  sleepLevel: number;
  category: LogCategory;
  note?: string;
}

const logSchema = new Schema<LogEntry>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  energyLevel: { type: Number, required: true, min: 1, max: 5 },
  moodLevel: { type: Number, required: true, min: 1, max: 5 },
  sleepLevel: { type: Number, required: true, min: 1, max: 5 },
  category: { type: String, required: true, enum: LOG_CATEGORIES },
  note: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const LogModel = model<LogEntry>('LogEntry', logSchema, 'logs');
