import { speakers } from './data';
import type { Speaker } from '@/types';

/**
 * Get speakers by their IDs
 */
export function getSpeakersByIds(ids: string[]): Speaker[] {
  return ids
    .map(id => speakers.find(speaker => speaker.id === id))
    .filter((speaker): speaker is Speaker => speaker !== undefined);
}

/**
 * Get upcoming events
 */
export function getUpcomingEvents() {
  const { events } = require('./data');
  return events.filter((event: { status: string }) => event.status === 'upcoming');
}

/**
 * Get past events
 */
export function getPastEvents() {
  const { events } = require('./data');
  return events.filter((event: { status: string }) => event.status === 'past');
}
