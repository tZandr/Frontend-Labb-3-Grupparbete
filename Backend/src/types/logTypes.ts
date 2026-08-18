import { Schema, model, Document, Types } from 'mongoose';

export const LOG_CATEGORIES = ['Mindfulness', 'Movement', 'Nutrition'] as const;
export type LogCategory = (typeof LOG_CATEGORIES)[number];

export interface LogEntry extends Document {
  userId: Types.ObjectId;
  energyLevel: number;
  moodLevel: number;
  sleepLevel: number;
  focusAreas: LogCategory[];
  note?: string;
  created_at: Date;
  updated_at: Date;
}

export interface LogInput {
  energyLevel: number;
  moodLevel: number;
  sleepLevel: number;
  focusAreas: LogCategory[];
  note?: string;
}

const logSchema = new Schema<LogEntry>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  energyLevel: { type: Number, required: true, min: 1, max: 5 },
  moodLevel: { type: Number, required: true, min: 1, max: 5 },
  sleepLevel: { type: Number, required: true, min: 1, max: 5 },
  focusAreas: {
    type: [String],
    enum: LOG_CATEGORIES,
    required: true,
    index: true,
    validate: {
      validator: (value: string[]) => Array.isArray(value) && value.length > 0,
      message: 'Select at least one focus area',
    },
  },
  note: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const LogModel = model<LogEntry>('LogEntry', logSchema, 'logs');
