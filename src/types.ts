/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'Bongo Flava' | 'Singeli' | 'Gospel' | 'Amapiano' | 'Hip Hop' | 'International';

export interface MusicPost {
  id: string;
  title: string;
  artist: string;
  date: string;
  category: Category;
  coverUrl: string;
  audioUrl?: string;
  downloadUrl: string;
  isTrending?: boolean;
}

export const CATEGORIES: Category[] = [
  'Bongo Flava',
  'Singeli',
  'Gospel',
  'Amapiano',
  'Hip Hop',
  'International'
];
