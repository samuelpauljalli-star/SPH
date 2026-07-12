/**
 * ScaleFinder Pro — Dual Mode Studio (60 Chords Database)
 * Mode 1: Chord -> Scale Analyzer (White & Crimson Red)
 * Mode 2: Scale -> Chord Finder (White & Sapphire Blue)
 */

const NOTE_FREQUENCIES = {
  'C3': 130.81, 'C♯3': 138.59, 'D♭3': 138.59, 'D3': 146.83, 'D♯3': 155.56, 'E♭3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F♯3': 185.00, 'G♭3': 185.00, 'G3': 196.00, 'G♯3': 207.65, 'A♭3': 207.65, 'A3': 220.00, 'A♯3': 233.08, 'B♭3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C♯4': 277.18, 'D♭4': 277.18, 'D4': 293.66, 'D♯4': 311.13, 'E♭4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F♯4': 369.99, 'G♭4': 369.99, 'G4': 392.00, 'G♯4': 415.30, 'A♭4': 415.30, 'A4': 440.00, 'A♯4': 466.16, 'B♭4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C♯5': 554.37, 'D♭5': 554.37, 'D5': 587.33, 'D♯5': 622.25, 'E♭5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F♯5': 739.99, 'G♭5': 739.99, 'G5': 783.99, 'G♯5': 830.61, 'A♭5': 830.61, 'A5': 880.00, 'B5': 987.77
};

/* =========================================================
   60 CHORDS COMPLETE DATABASE (Major, Minor, Aug, Dim, 7th)
   ========================================================= */
const CHORDS_DATABASE = [
  // --- 12 MAJOR CHORDS ---
  { id: 'C_MAJ', name: 'C Major', shortName: 'C Maj', type: 'major', notes: ['C', 'E', 'G'], pitchClasses: [0, 4, 7], octaveNotes: ['C4', 'E4', 'G4'], isPrimary: true },
  { id: 'CS_MAJ', name: 'C♯ / D♭ Major', shortName: 'D♭ Maj', type: 'major', notes: ['D♭', 'F', 'A♭'], pitchClasses: [1, 5, 8], octaveNotes: ['D♭4', 'F4', 'A♭4'], isPrimary: false },
  { id: 'D_MAJ', name: 'D Major', shortName: 'D Maj', type: 'major', notes: ['D', 'F♯', 'A'], pitchClasses: [2, 6, 9], octaveNotes: ['D4', 'F♯4', 'A4'], isPrimary: true },
  { id: 'EB_MAJ', name: 'E♭ Major', shortName: 'E♭ Maj', type: 'major', notes: ['E♭', 'G', 'B♭'], pitchClasses: [3, 7, 10], octaveNotes: ['E♭4', 'G4', 'B♭4'], isPrimary: false },
  { id: 'E_MAJ', name: 'E Major', shortName: 'E Maj', type: 'major', notes: ['E', 'G♯', 'B'], pitchClasses: [4, 8, 11], octaveNotes: ['E4', 'G♯4', 'B4'], isPrimary: true },
  { id: 'F_MAJ', name: 'F Major', shortName: 'F Maj', type: 'major', notes: ['F', 'A', 'C'], pitchClasses: [5, 9, 0], octaveNotes: ['F4', 'A4', 'C5'], isPrimary: true },
  { id: 'FS_MAJ', name: 'F♯ / G♭ Major', shortName: 'F♯ Maj', type: 'major', notes: ['F♯', 'A♯', 'C♯'], pitchClasses: [6, 10, 1], octaveNotes: ['F♯4', 'A♯4', 'C♯5'], isPrimary: false },
  { id: 'G_MAJ', name: 'G Major', shortName: 'G Maj', type: 'major', notes: ['G', 'B', 'D'], pitchClasses: [7, 11, 2], octaveNotes: ['G3', 'B3', 'D4'], isPrimary: true },
  { id: 'AB_MAJ', name: 'A♭ Major', shortName: 'A♭ Maj', type: 'major', notes: ['A♭', 'C', 'E♭'], pitchClasses: [8, 0, 3], octaveNotes: ['A♭3', 'C4', 'E♭4'], isPrimary: false },
  { id: 'A_MAJ', name: 'A Major', shortName: 'A Maj', type: 'major', notes: ['A', 'C♯', 'E'], pitchClasses: [9, 1, 4], octaveNotes: ['A3', 'C♯4', 'E4'], isPrimary: true },
  { id: 'BB_MAJ', name: 'B♭ Major', shortName: 'B♭ Maj', type: 'major', notes: ['B♭', 'D', 'F'], pitchClasses: [10, 2, 5], octaveNotes: ['B♭3', 'D4', 'F4'], isPrimary: false },
  { id: 'B_MAJ', name: 'B Major', shortName: 'B Maj', type: 'major', notes: ['B', 'D♯', 'F♯'], pitchClasses: [11, 3, 6], octaveNotes: ['B3', 'D♯4', 'F♯4'], isPrimary: true },

  // --- 12 MINOR CHORDS ---
  { id: 'C_MIN', name: 'C Minor', shortName: 'C Min', type: 'minor', notes: ['C', 'E♭', 'G'], pitchClasses: [0, 3, 7], octaveNotes: ['C4', 'E♭4', 'G4'], isPrimary: true },
  { id: 'CS_MIN', name: 'C♯ Minor', shortName: 'C♯ Min', type: 'minor', notes: ['C♯', 'E', 'G♯'], pitchClasses: [1, 4, 8], octaveNotes: ['C♯4', 'E4', 'G♯4'], isPrimary: false },
  { id: 'D_MIN', name: 'D Minor', shortName: 'D Min', type: 'minor', notes: ['D', 'F', 'A'], pitchClasses: [2, 5, 9], octaveNotes: ['D4', 'F4', 'A4'], isPrimary: true },
  { id: 'EB_MIN', name: 'E♭ Minor', shortName: 'E♭ Min', type: 'minor', notes: ['E♭', 'G♭', 'B♭'], pitchClasses: [3, 6, 10], octaveNotes: ['E♭4', 'G♭4', 'B♭4'], isPrimary: false },
  { id: 'E_MIN', name: 'E Minor', shortName: 'E Min', type: 'minor', notes: ['E', 'G', 'B'], pitchClasses: [4, 7, 11], octaveNotes: ['E4', 'G4', 'B4'], isPrimary: true },
  { id: 'F_MIN', name: 'F Minor', shortName: 'F Min', type: 'minor', notes: ['F', 'A♭', 'C'], pitchClasses: [5, 8, 0], octaveNotes: ['F4', 'A♭4', 'C5'], isPrimary: true },
  { id: 'FS_MIN', name: 'F♯ Minor', shortName: 'F♯ Min', type: 'minor', notes: ['F♯', 'A', 'C♯'], pitchClasses: [6, 9, 1], octaveNotes: ['F♯4', 'A4', 'C♯5'], isPrimary: false },
  { id: 'G_MIN', name: 'G Minor', shortName: 'G Min', type: 'minor', notes: ['G', 'B♭', 'D'], pitchClasses: [7, 10, 2], octaveNotes: ['G3', 'B♭3', 'D4'], isPrimary: true },
  { id: 'GS_MIN', name: 'G♯ Minor', shortName: 'G♯ Min', type: 'minor', notes: ['G♯', 'B', 'D♯'], pitchClasses: [8, 11, 3], octaveNotes: ['G♯3', 'B3', 'D♯4'], isPrimary: false },
  { id: 'A_MIN', name: 'A Minor', shortName: 'A Min', type: 'minor', notes: ['A', 'C', 'E'], pitchClasses: [9, 0, 4], octaveNotes: ['A3', 'C4', 'E4'], isPrimary: true },
  { id: 'BB_MIN', name: 'B♭ Minor', shortName: 'B♭ Min', type: 'minor', notes: ['B♭', 'D♭', 'F'], pitchClasses: [10, 1, 5], octaveNotes: ['B♭3', 'D♭4', 'F4'], isPrimary: false },
  { id: 'B_MIN', name: 'B Minor', shortName: 'B Min', type: 'minor', notes: ['B', 'D', 'F♯'], pitchClasses: [11, 2, 6], octaveNotes: ['B3', 'D4', 'F♯4'], isPrimary: true },

  // --- 12 AUGMENTED CHORDS ---
  { id: 'C_AUG', name: 'C Augmented', shortName: 'C Aug', type: 'augmented', notes: ['C', 'E', 'G♯'], pitchClasses: [0, 4, 8], octaveNotes: ['C4', 'E4', 'G♯4'] },
  { id: 'CS_AUG', name: 'D♭ Augmented', shortName: 'D♭ Aug', type: 'augmented', notes: ['D♭', 'F', 'A'], pitchClasses: [1, 5, 9], octaveNotes: ['D♭4', 'F4', 'A4'] },
  { id: 'D_AUG', name: 'D Augmented', shortName: 'D Aug', type: 'augmented', notes: ['D', 'F♯', 'A♯'], pitchClasses: [2, 6, 10], octaveNotes: ['D4', 'F♯4', 'A♯4'] },
  { id: 'EB_AUG', name: 'E♭ Augmented', shortName: 'E♭ Aug', type: 'augmented', notes: ['E♭', 'G', 'B'], pitchClasses: [3, 7, 11], octaveNotes: ['E♭4', 'G4', 'B4'] },
  { id: 'E_AUG', name: 'E Augmented', shortName: 'E Aug', type: 'augmented', notes: ['E', 'G♯', 'C'], pitchClasses: [4, 8, 0], octaveNotes: ['E4', 'G♯4', 'C5'] },
  { id: 'F_AUG', name: 'F Augmented', shortName: 'F Aug', type: 'augmented', notes: ['F', 'A', 'C♯'], pitchClasses: [5, 9, 1], octaveNotes: ['F4', 'A4', 'C♯5'] },
  { id: 'FS_AUG', name: 'F♯ Augmented', shortName: 'F♯ Aug', type: 'augmented', notes: ['F♯', 'A♯', 'D'], pitchClasses: [6, 10, 2], octaveNotes: ['F♯4', 'A♯4', 'D5'] },
  { id: 'G_AUG', name: 'G Augmented', shortName: 'G Aug', type: 'augmented', notes: ['G', 'B', 'D♯'], pitchClasses: [7, 11, 3], octaveNotes: ['G3', 'B3', 'D♯4'] },
  { id: 'AB_AUG', name: 'A♭ Augmented', shortName: 'A♭ Aug', type: 'augmented', notes: ['A♭', 'C', 'E'], pitchClasses: [8, 0, 4], octaveNotes: ['A♭3', 'C4', 'E4'] },
  { id: 'A_AUG', name: 'A Augmented', shortName: 'A Aug', type: 'augmented', notes: ['A', 'C♯', 'F'], pitchClasses: [9, 1, 5], octaveNotes: ['A3', 'C♯4', 'F4'] },
  { id: 'BB_AUG', name: 'B♭ Augmented', shortName: 'B♭ Aug', type: 'augmented', notes: ['B♭', 'D', 'F♯'], pitchClasses: [10, 2, 6], octaveNotes: ['B♭3', 'D4', 'F♯4'] },
  { id: 'B_AUG', name: 'B Augmented', shortName: 'B Aug', type: 'augmented', notes: ['B', 'D♯', 'G'], pitchClasses: [11, 3, 7], octaveNotes: ['B3', 'D♯4', 'G4'] },

  // --- 12 DIMINISHED CHORDS ---
  { id: 'C_DIM', name: 'C Diminished', shortName: 'C Dim', type: 'diminished', notes: ['C', 'E♭', 'G♭'], pitchClasses: [0, 3, 6], octaveNotes: ['C4', 'E♭4', 'G♭4'] },
  { id: 'CS_DIM', name: 'C♯ Diminished', shortName: 'C♯ Dim', type: 'diminished', notes: ['C♯', 'E', 'G'], pitchClasses: [1, 4, 7], octaveNotes: ['C♯4', 'E4', 'G4'] },
  { id: 'D_DIM', name: 'D Diminished', shortName: 'D Dim', type: 'diminished', notes: ['D', 'F', 'A♭'], pitchClasses: [2, 5, 8], octaveNotes: ['D4', 'F4', 'A♭4'] },
  { id: 'EB_DIM', name: 'E♭ Diminished', shortName: 'E♭ Dim', type: 'diminished', notes: ['E♭', 'G♭', 'A'], pitchClasses: [3, 6, 9], octaveNotes: ['E♭4', 'G♭4', 'A4'] },
  { id: 'E_DIM', name: 'E Diminished', shortName: 'E Dim', type: 'diminished', notes: ['E', 'G', 'B♭'], pitchClasses: [4, 7, 10], octaveNotes: ['E4', 'G4', 'B♭4'] },
  { id: 'F_DIM', name: 'F Diminished', shortName: 'F Dim', type: 'diminished', notes: ['F', 'A♭', 'B'], pitchClasses: [5, 8, 11], octaveNotes: ['F4', 'A♭4', 'B4'] },
  { id: 'FS_DIM', name: 'F♯ Diminished', shortName: 'F♯ Dim', type: 'diminished', notes: ['F♯', 'A', 'C'], pitchClasses: [6, 9, 0], octaveNotes: ['F♯4', 'A4', 'C5'] },
  { id: 'G_DIM', name: 'G Diminished', shortName: 'G Dim', type: 'diminished', notes: ['G', 'B♭', 'D♭'], pitchClasses: [7, 10, 1], octaveNotes: ['G3', 'B♭3', 'D♭4'] },
  { id: 'AB_DIM', name: 'G♯ / A♭ Diminished', shortName: 'A♭ Dim', type: 'diminished', notes: ['A♭', 'B', 'D'], pitchClasses: [8, 11, 2], octaveNotes: ['A♭3', 'B3', 'D4'] },
  { id: 'A_DIM', name: 'A Diminished', shortName: 'A Dim', type: 'diminished', notes: ['A', 'C', 'E♭'], pitchClasses: [9, 0, 3], octaveNotes: ['A3', 'C4', 'E♭4'] },
  { id: 'BB_DIM', name: 'B♭ Diminished', shortName: 'B♭ Dim', type: 'diminished', notes: ['B♭', 'D♭', 'E'], pitchClasses: [10, 1, 4], octaveNotes: ['B♭3', 'D♭4', 'E4'] },
  { id: 'B_DIM', name: 'B Diminished', shortName: 'B Dim', type: 'diminished', notes: ['B', 'D', 'F'], pitchClasses: [11, 2, 5], octaveNotes: ['B3', 'D4', 'F4'] },

  // --- 12 SEVENTH (DOMINANT 7TH) CHORDS ---
  { id: 'C_7', name: 'C Seventh', shortName: 'C7', type: 'seventh', notes: ['C', 'E', 'G', 'B♭'], pitchClasses: [0, 4, 7, 10], octaveNotes: ['C4', 'E4', 'G4', 'B♭4'] },
  { id: 'CS_7', name: 'D♭ Seventh', shortName: 'D♭7', type: 'seventh', notes: ['D♭', 'F', 'A♭', 'B'], pitchClasses: [1, 5, 8, 11], octaveNotes: ['D♭4', 'F4', 'A♭4', 'B4'] },
  { id: 'D_7', name: 'D Seventh', shortName: 'D7', type: 'seventh', notes: ['D', 'F♯', 'A', 'C'], pitchClasses: [2, 6, 9, 0], octaveNotes: ['D4', 'F♯4', 'A4', 'C5'] },
  { id: 'EB_7', name: 'E♭ Seventh', shortName: 'E♭7', type: 'seventh', notes: ['E♭', 'G', 'B♭', 'D♭'], pitchClasses: [3, 7, 10, 1], octaveNotes: ['E♭4', 'G4', 'B♭4', 'D♭5'] },
  { id: 'E_7', name: 'E Seventh', shortName: 'E7', type: 'seventh', notes: ['E', 'G♯', 'B', 'D'], pitchClasses: [4, 8, 11, 2], octaveNotes: ['E4', 'G♯4', 'B4', 'D5'] },
  { id: 'F_7', name: 'F Seventh', shortName: 'F7', type: 'seventh', notes: ['F', 'A', 'C', 'E♭'], pitchClasses: [5, 9, 0, 3], octaveNotes: ['F4', 'A4', 'C5', 'E♭5'] },
  { id: 'FS_7', name: 'F♯ Seventh', shortName: 'F♯7', type: 'seventh', notes: ['F♯', 'A♯', 'C♯', 'E'], pitchClasses: [6, 10, 1, 4], octaveNotes: ['F♯4', 'A♯4', 'C♯5', 'E5'] },
  { id: 'G_7', name: 'G Seventh', shortName: 'G7', type: 'seventh', notes: ['G', 'B', 'D', 'F'], pitchClasses: [7, 11, 2, 5], octaveNotes: ['G3', 'B3', 'D4', 'F4'] },
  { id: 'AB_7', name: 'A♭ Seventh', shortName: 'A♭7', type: 'seventh', notes: ['A♭', 'C', 'E♭', 'G♭'], pitchClasses: [8, 0, 3, 6], octaveNotes: ['A♭3', 'C4', 'E♭4', 'G♭4'] },
  { id: 'A_7', name: 'A Seventh', shortName: 'A7', type: 'seventh', notes: ['A', 'C♯', 'E', 'G'], pitchClasses: [9, 1, 4, 7], octaveNotes: ['A3', 'C♯4', 'E4', 'G4'] },
  { id: 'BB_7', name: 'B♭ Seventh', shortName: 'B♭7', type: 'seventh', notes: ['B♭', 'D', 'F', 'A♭'], pitchClasses: [10, 2, 5, 8], octaveNotes: ['B♭3', 'D4', 'F4', 'A♭4'] },
  { id: 'B_7', name: 'B Seventh', shortName: 'B7', type: 'seventh', notes: ['B', 'D♯', 'F♯', 'A'], pitchClasses: [11, 3, 6, 9], octaveNotes: ['B3', 'D♯4', 'F♯4', 'A4'] }
];

/* =========================================================
   SCALES DATABASE (Major & Natural Minor)
   ========================================================= */
const SCALES_DATABASE = [
  // Major Scales
  { id: 'SCALE_C_MAJ', name: 'C Major', type: 'major', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'], pitchClasses: [0, 2, 4, 5, 7, 9, 11] },
  { id: 'SCALE_DB_MAJ', name: 'D♭ Major', type: 'major', notes: ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C', 'D♭'], pitchClasses: [1, 3, 5, 6, 8, 10, 0] },
  { id: 'SCALE_D_MAJ', name: 'D Major', type: 'major', notes: ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯', 'D'], pitchClasses: [2, 4, 6, 7, 9, 11, 1] },
  { id: 'SCALE_EB_MAJ', name: 'E♭ Major', type: 'major', notes: ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D', 'E♭'], pitchClasses: [3, 5, 7, 8, 10, 0, 2] },
  { id: 'SCALE_E_MAJ', name: 'E Major', type: 'major', notes: ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯', 'E'], pitchClasses: [4, 6, 8, 9, 11, 1, 3] },
  { id: 'SCALE_F_MAJ', name: 'F Major', type: 'major', notes: ['F', 'G', 'A', 'B♭', 'C', 'D', 'E', 'F'], pitchClasses: [5, 7, 9, 10, 0, 2, 4] },
  { id: 'SCALE_FS_MAJ', name: 'F♯ / G♭ Major', type: 'major', notes: ['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯', 'F♯'], pitchClasses: [6, 8, 10, 11, 1, 3, 5] },
  { id: 'SCALE_G_MAJ', name: 'G Major', type: 'major', notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F♯', 'G'], pitchClasses: [7, 9, 11, 0, 2, 4, 6] },
  { id: 'SCALE_AB_MAJ', name: 'A♭ Major', type: 'major', notes: ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G', 'A♭'], pitchClasses: [8, 10, 0, 1, 3, 5, 7] },
  { id: 'SCALE_A_MAJ', name: 'A Major', type: 'major', notes: ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯', 'A'], pitchClasses: [9, 11, 1, 2, 4, 6, 8] },
  { id: 'SCALE_BB_MAJ', name: 'B♭ Major', type: 'major', notes: ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A', 'B♭'], pitchClasses: [10, 0, 2, 3, 5, 7, 9] },
  { id: 'SCALE_B_MAJ', name: 'B Major', type: 'major', notes: ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯', 'B'], pitchClasses: [11, 1, 3, 4, 6, 8, 10] },

  // Minor Scales
  { id: 'SCALE_C_MIN', name: 'C Minor', type: 'minor', notes: ['C', 'D', 'E♭', 'F', 'G', 'A♭', 'B♭', 'C'], pitchClasses: [0, 2, 3, 5, 7, 8, 10] },
  { id: 'SCALE_CS_MIN', name: 'C♯ Minor', type: 'minor', notes: ['C♯', 'D♯', 'E', 'F♯', 'G♯', 'A', 'B', 'C♯'], pitchClasses: [1, 3, 4, 6, 8, 9, 11] },
  { id: 'SCALE_D_MIN', name: 'D Minor', type: 'minor', notes: ['D', 'E', 'F', 'G', 'A', 'B♭', 'C', 'D'], pitchClasses: [2, 4, 5, 7, 9, 10, 0] },
  { id: 'SCALE_EB_MIN', name: 'E♭ Minor', type: 'minor', notes: ['E♭', 'F', 'G♭', 'A♭', 'B♭', 'C♭', 'D♭', 'E♭'], pitchClasses: [3, 5, 6, 8, 10, 11, 1] },
  { id: 'SCALE_E_MIN', name: 'E Minor', type: 'minor', notes: ['E', 'F♯', 'G', 'A', 'B', 'C', 'D', 'E'], pitchClasses: [4, 6, 7, 9, 11, 0, 2] },
  { id: 'SCALE_F_MIN', name: 'F Minor', type: 'minor', notes: ['F', 'G', 'A♭', 'B♭', 'C', 'D♭', 'E♭', 'F'], pitchClasses: [5, 7, 8, 10, 0, 1, 3] },
  { id: 'SCALE_FS_MIN', name: 'F♯ Minor', type: 'minor', notes: ['F♯', 'G♯', 'A', 'B', 'C♯', 'D', 'E', 'F♯'], pitchClasses: [6, 8, 9, 11, 1, 2, 4] },
  { id: 'SCALE_G_MIN', name: 'G Minor', type: 'minor', notes: ['G', 'A', 'B♭', 'C', 'D', 'E♭', 'F', 'G'], pitchClasses: [7, 9, 10, 0, 2, 3, 5] },
  { id: 'SCALE_GS_MIN', name: 'G♯ Minor', type: 'minor', notes: ['G♯', 'A♯', 'B', 'C♯', 'D♯', 'E', 'F♯', 'G♯'], pitchClasses: [8, 10, 11, 1, 3, 4, 6] },
  { id: 'SCALE_A_MIN', name: 'A Minor', type: 'minor', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'], pitchClasses: [9, 11, 0, 2, 4, 5, 7] },
  { id: 'SCALE_BB_MIN', name: 'B♭ Minor', type: 'minor', notes: ['B♭', 'C', 'D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭'], pitchClasses: [10, 0, 1, 3, 5, 6, 8] },
  { id: 'SCALE_B_MIN', name: 'B Minor', type: 'minor', notes: ['B', 'C♯', 'D', 'E', 'F♯', 'G', 'A', 'B'], pitchClasses: [11, 1, 2, 4, 6, 7, 9] }
];

function getDiatonicChordsForScale(scale) {
  const scalePCs = new Set(scale.pitchClasses);
  const diatonicList = [];

  const majorNumerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
  const minorNumerals = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];

  scale.pitchClasses.forEach((degreePC, index) => {
    const numeral = scale.type === 'major' ? majorNumerals[index] : minorNumerals[index];

    CHORDS_DATABASE.forEach(chord => {
      if (chord.pitchClasses[0] === degreePC) {
        const isDiatonic = chord.pitchClasses.every(pc => scalePCs.has(pc));
        if (isDiatonic) {
          diatonicList.push({
            numeral: numeral,
            chord: chord
          });
        }
      }
    });
  });

  return diatonicList;
}

/* =========================================================
   STATE MANAGEMENT & DUAL-MODE LOGIC
   ========================================================= */
const state = {
  appMode: 'chordToScale', // 'chordToScale' (White & Red) | 'scaleToChord' (White & Blue)
  selectedChordIds: [],
  selectedScaleId: 'SCALE_C_MAJ', // For Mode 2
  userSongs: [],
  chordCategoryFilter: 'all', // 'all' | 'major' | 'minor' | 'augmented' | 'diminished' | 'seventh'
  scaleFilter: 'all',
  songLanguageFilter: 'all',
  songSearchQuery: '',
  audioContext: null,
  firebaseEnabled: false,
  firebaseConnected: false,
  firestoreDb: null
};

/* =========================================================
   DEFAULT FIREBASE CONFIGURATION TEMPLATE
   ========================================================= */
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Switch between Mode 1 (Red) and Mode 2 (Blue)
function switchAppMode(mode) {
  state.appMode = mode;
  const redBtn = document.getElementById('modeBtnRed');
  const blueBtn = document.getElementById('modeBtnBlue');

  if (redBtn && blueBtn) {
    redBtn.classList.toggle('active', mode === 'chordToScale');
    blueBtn.classList.toggle('active', mode === 'scaleToChord');
  }

  if (mode === 'scaleToChord') {
    document.body.setAttribute('data-theme', 'blue');
    document.getElementById('chordToScaleSection').style.display = 'none';
    document.getElementById('scaleToChordSection').style.display = 'block';
    renderScaleToChordFinder();
  } else {
    document.body.removeAttribute('data-theme');
    document.getElementById('chordToScaleSection').style.display = 'block';
    document.getElementById('scaleToChordSection').style.display = 'none';
    renderAll();
  }
}

function loadUserSongs() {
  try {
    const saved = localStorage.getItem('scaleFinder_userSongs');
    if (saved) {
      state.userSongs = JSON.parse(saved);
    } else {
      state.userSongs = [];
    }
  } catch (err) {
    console.error('Error loading user songs:', err);
    state.userSongs = [];
  }
}

function saveUserSongsToStorage() {
  try {
    localStorage.setItem('scaleFinder_userSongs', JSON.stringify(state.userSongs));
  } catch (err) {
    console.error('Error saving user songs:', err);
  }
}

/* =========================================================
   AUDIO SYNTHESIZER
   ========================================================= */
function initAudio() {
  if (!state.audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioCtx();
  }
  if (state.audioContext.state === 'suspended') {
    state.audioContext.resume();
  }
}

function playTone(freq, startTime, duration = 1.0) {
  initAudio();
  const ctx = state.audioContext;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.1, startTime + duration * 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

function playChordAudio(chordId) {
  const chord = CHORDS_DATABASE.find(c => c.id === chordId);
  if (!chord) return;

  initAudio();
  const now = state.audioContext.currentTime;
  chord.octaveNotes.forEach((noteName, idx) => {
    const freq = NOTE_FREQUENCIES[noteName] || 261.63;
    playTone(freq, now + idx * 0.03, 1.4);
  });
}

function playProgressionAudio() {
  if (state.selectedChordIds.length === 0) return;

  initAudio();
  const now = state.audioContext.currentTime;
  const chordDuration = 1.1;

  state.selectedChordIds.forEach((chordId, stepIndex) => {
    const chord = CHORDS_DATABASE.find(c => c.id === chordId);
    if (!chord) return;

    chord.octaveNotes.forEach((noteName, noteIndex) => {
      const freq = NOTE_FREQUENCIES[noteName] || 261.63;
      playTone(freq, now + stepIndex * chordDuration + noteIndex * 0.025, chordDuration * 0.95);
    });
  });
}

function playScaleAudio(scaleId) {
  const scale = SCALES_DATABASE.find(s => s.id === scaleId);
  if (!scale) return;

  initAudio();
  const now = state.audioContext.currentTime;
  const noteDuration = 0.28;

  scale.notes.forEach((noteName, idx) => {
    const cleanNote = noteName.replace('♭', '♭').replace('♯', '♯');
    const fullNote = cleanNote + (idx === 7 ? '5' : '4');
    const freq = NOTE_FREQUENCIES[fullNote] || 261.63;
    playTone(freq, now + idx * noteDuration, 0.45);
  });
}

/* =========================================================
   3-OCTAVE PIANO KEYBOARD (36 Keys C3 to B5)
   ========================================================= */
const PIANO_KEYS = [
  // --- Octave 1 ---
  { pc: 0, note: 'C3', label: 'C', isBlack: false },
  { pc: 1, note: 'C♯3', label: 'C♯', isBlack: true },
  { pc: 2, note: 'D3', label: 'D', isBlack: false },
  { pc: 3, note: 'D♯3', label: 'D♯', isBlack: true },
  { pc: 4, note: 'E3', label: 'E', isBlack: false },
  { pc: 5, note: 'F3', label: 'F', isBlack: false },
  { pc: 6, note: 'F♯3', label: 'F♯', isBlack: true },
  { pc: 7, note: 'G3', label: 'G', isBlack: false },
  { pc: 8, note: 'G♯3', label: 'G♯', isBlack: true },
  { pc: 9, note: 'A3', label: 'A', isBlack: false },
  { pc: 10, note: 'B♭3', label: 'B♭', isBlack: true },
  { pc: 11, note: 'B3', label: 'B', isBlack: false },

  // --- Octave 2 ---
  { pc: 0, note: 'C4', label: 'C', isBlack: false },
  { pc: 1, note: 'C♯4', label: 'C♯', isBlack: true },
  { pc: 2, note: 'D4', label: 'D', isBlack: false },
  { pc: 3, note: 'D♯4', label: 'D♯', isBlack: true },
  { pc: 4, note: 'E4', label: 'E', isBlack: false },
  { pc: 5, note: 'F4', label: 'F', isBlack: false },
  { pc: 6, note: 'F♯4', label: 'F♯', isBlack: true },
  { pc: 7, note: 'G4', label: 'G', isBlack: false },
  { pc: 8, note: 'G♯4', label: 'G♯', isBlack: true },
  { pc: 9, note: 'A4', label: 'A', isBlack: false },
  { pc: 10, note: 'B♭4', label: 'B♭', isBlack: true },
  { pc: 11, note: 'B4', label: 'B', isBlack: false },

  // --- Octave 3 ---
  { pc: 0, note: 'C5', label: 'C', isBlack: false },
  { pc: 1, note: 'C♯5', label: 'C♯', isBlack: true },
  { pc: 2, note: 'D5', label: 'D', isBlack: false },
  { pc: 3, note: 'D♯5', label: 'D♯', isBlack: true },
  { pc: 4, note: 'E5', label: 'E', isBlack: false },
  { pc: 5, note: 'F5', label: 'F', isBlack: false },
  { pc: 6, note: 'F♯5', label: 'F♯', isBlack: true },
  { pc: 7, note: 'G5', label: 'G', isBlack: false },
  { pc: 8, note: 'G♯5', label: 'G♯', isBlack: true },
  { pc: 9, note: 'A5', label: 'A', isBlack: false },
  { pc: 10, note: 'B♭5', label: 'B♭', isBlack: true },
  { pc: 11, note: 'B5', label: 'B', isBlack: false }
];

function renderPianoKeyboard() {
  const container = document.getElementById('pianoKeyboard');
  if (!container) return;
  container.innerHTML = '';

  let whiteKeyOffset = 0;
  PIANO_KEYS.forEach((keyInfo) => {
    if (!keyInfo.isBlack) {
      const keyEl = document.createElement('div');
      keyEl.className = 'white-key';
      keyEl.dataset.pc = keyInfo.pc;
      keyEl.innerHTML = `<span class="key-label">${keyInfo.label}</span>`;
      container.appendChild(keyEl);
      whiteKeyOffset += 42;
    } else {
      const keyEl = document.createElement('div');
      keyEl.className = 'black-key';
      keyEl.dataset.pc = keyInfo.pc;
      keyEl.style.left = `${whiteKeyOffset - 14}px`;
      keyEl.innerHTML = `<span class="key-label">${keyInfo.label}</span>`;
      container.appendChild(keyEl);
    }
  });
}

function updatePianoHighlights(activeChordPCs = [], activeScalePCs = []) {
  const keys = document.querySelectorAll('#pianoKeyboard [data-pc]');
  const chordSet = new Set(activeChordPCs);
  const scaleSet = new Set(activeScalePCs);

  keys.forEach(key => {
    const pc = parseInt(key.dataset.pc, 10);
    key.classList.remove('active-chord', 'active-scale');

    if (chordSet.has(pc)) {
      key.classList.add('active-chord');
    } else if (scaleSet.has(pc)) {
      key.classList.add('active-scale');
    }
  });
}

function syncPianoWithCurrentState() {
  if (state.appMode === 'scaleToChord') {
    const scale = SCALES_DATABASE.find(s => s.id === state.selectedScaleId);
    if (scale) {
      updatePianoHighlights([], scale.pitchClasses);
    }
  } else {
    const allSelectedPCs = new Set();
    state.selectedChordIds.forEach(id => {
      const c = CHORDS_DATABASE.find(item => item.id === id);
      if (c) {
        c.pitchClasses.forEach(pc => allSelectedPCs.add(pc));
      }
    });
    updatePianoHighlights(Array.from(allSelectedPCs), []);
  }
}

/* =========================================================
   MODE 2: SCALE -> CHORD FINDER (WHITE & SAPPHIRE BLUE)
   ========================================================= */
function renderScaleToChordFinder() {
  renderScaleSelectionGrid();
  renderScaleChordsResults();
  syncPianoWithCurrentState();
}

function renderScaleSelectionGrid() {
  const container = document.getElementById('scaleButtonsGrid');
  if (!container) return;
  container.innerHTML = '';

  SCALES_DATABASE.forEach(scale => {
    const isSelected = scale.id === state.selectedScaleId;
    const btn = document.createElement('button');
    btn.className = `scale-btn ${isSelected ? 'selected' : ''}`;
    btn.onclick = () => {
      state.selectedScaleId = scale.id;
      renderScaleToChordFinder();
      playScaleAudio(scale.id);
    };

    btn.innerHTML = `
      <span>${scale.name}</span>
      <span style="font-size: 0.72rem; opacity: 0.85;">${scale.type.toUpperCase()}</span>
    `;
    container.appendChild(btn);
  });
}

function renderScaleChordsResults() {
  const container = document.getElementById('scaleChordsResultContainer');
  if (!container) return;
  container.innerHTML = '';

  const scale = SCALES_DATABASE.find(s => s.id === state.selectedScaleId) || SCALES_DATABASE[0];
  const diatonicList = getDiatonicChordsForScale(scale);

  const notesHtml = scale.notes.map(noteName => {
    return `<span class="scale-note-badge in-song">${noteName}</span>`;
  }).join('');

  const diatonicChordsHtml = diatonicList.map(item => {
    const isSelected = state.selectedChordIds.includes(item.chord.id);
    return `
      <div class="diatonic-chord-item ${isSelected ? 'active-song-chord' : ''}" onclick="toggleChordSelection('${item.chord.id}')">
        <span class="roman-numeral">${item.numeral}</span>
        <span class="diatonic-chord-name">${item.chord.shortName}</span>
        <span style="font-size: 0.73rem; color: var(--text-muted);">${item.chord.notes.join('-')}</span>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="scale-card perfect-match">
      <div class="scale-card-header">
        <div class="scale-title-wrapper">
          <h3 class="scale-name">Selected Key: ${scale.name} Scale</h3>
          <span class="match-badge perfect">★ Active Scale Palette</span>
        </div>
        <div class="scale-actions">
          <button class="btn btn-secondary" onclick="playScaleAudio('${scale.id}')">
            🔊 Play Scale Notes
          </button>
        </div>
      </div>

      <div style="margin-bottom: 8px; font-weight: 700; font-size: 0.88rem; color: var(--primary);">
        Scale Notes:
      </div>
      <div class="scale-notes-row">
        ${notesHtml}
      </div>

      <div style="margin-bottom: 8px; font-weight: 700; font-size: 0.88rem; color: var(--primary);">
        All Diatonic & Harmonic Chords belonging to ${scale.name} (Click any chord to add to your song sequence):
      </div>
      <div class="diatonic-chords-list">
        ${diatonicChordsHtml}
      </div>
    </div>
  `;
}

/* =========================================================
   USER SONGBOOK MODAL & TABLE
   ========================================================= */
function openSongbookModal() {
  renderSongLibraryTable();
  const modal = document.getElementById('songbookModal');
  if (modal) modal.classList.add('open');
}

function closeSongbookModal() {
  const modal = document.getElementById('songbookModal');
  if (modal) modal.classList.remove('open');
}

function renderSongLibraryTable() {
  const tbody = document.getElementById('songLibraryBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const filteredSongs = state.userSongs.filter(song => {
    const matchLang = state.songLanguageFilter === 'all' || song.language === state.songLanguageFilter;
    if (!matchLang) return false;

    if (!state.songSearchQuery.trim()) return true;

    const query = state.songSearchQuery.toLowerCase().trim();
    const nameMatch = song.name.toLowerCase().includes(query);
    const numMatch = String(song.number).includes(query);
    const chordMatch = (song.displayChords || []).join(' ').toLowerCase().includes(query);
    const scaleMatch = (song.scaleName || '').toLowerCase().includes(query);

    return nameMatch || numMatch || chordMatch || scaleMatch;
  });

  if (filteredSongs.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 40px 24px; color: var(--text-muted);">
          <div style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px; color: var(--text-main);">
            ${state.userSongs.length === 0 ? 'Your Songbook is Empty!' : 'No matching songs found'}
          </div>
          <p style="font-size: 0.9rem;">
            Select chords or scales and click "💾 Save Current Song" to store your song details.
          </p>
        </td>
      </tr>
    `;
    return;
  }

  filteredSongs.forEach(song => {
    const tr = document.createElement('tr');

    const chordsHtml = (song.displayChords || [])
      .map(ch => `<span class="chord-mini-pill">${ch}</span>`)
      .join('');

    tr.innerHTML = `
      <td style="width: 70px;">
        <span class="song-num-badge">#${song.number}</span>
      </td>
      <td>
        <div class="song-title-cell">${song.name}</div>
      </td>
      <td>
        <span class="lang-badge ${song.language || 'english'}">${song.language || 'english'}</span>
      </td>
      <td>
        <div class="chords-pill-group">${chordsHtml}</div>
      </td>
      <td>
        <span class="scale-tag">${song.scaleName || 'N/A'}</span>
      </td>
      <td style="text-align: right;">
        <div class="song-actions-group">
          <button class="song-load-btn" onclick="loadSongChords('${song.id}')">
            ⚡ Analyze
          </button>
          <button class="song-delete-btn" title="Delete Song" onclick="deleteSong('${song.id}')">
            🗑 Delete
          </button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function setSongLanguageFilter(lang) {
  state.songLanguageFilter = lang;
  document.querySelectorAll('#languageButtonsGroup .lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  renderSongLibraryTable();
}

function handleSongSearchInput(e) {
  state.songSearchQuery = e.target.value;
  renderSongLibraryTable();
}

function loadSongChords(songId) {
  const song = state.userSongs.find(s => String(s.id) === String(songId));
  if (!song) return;

  state.selectedChordIds = [...song.chords];
  closeSongbookModal();

  if (state.appMode === 'scaleToChord') {
    const sc = SCALES_DATABASE.find(s => s.name === song.scaleName);
    if (sc) state.selectedScaleId = sc.id;
    renderScaleToChordFinder();
  } else {
    renderAll();
  }
  renderProgressionBar();
  playProgressionAudio();
}

function deleteSong(songId) {
  if (!confirm('Are you sure you want to delete this song from your Songbook?')) return;
  state.userSongs = state.userSongs.filter(s => String(s.id) !== String(songId));
  saveUserSongsToStorage();
  deleteSongFromFirebase(songId);
  renderSongLibraryTable();
}

/* =========================================================
   DETECTED SCALES EVALUATION FOR DROPDOWN
   ========================================================= */
function getEvaluatedScalesForCurrentChords() {
  const selectedChords = state.selectedChordIds
    .map(id => CHORDS_DATABASE.find(c => c.id === id))
    .filter(Boolean);

  const scaleEvaluations = SCALES_DATABASE.map(scale => {
    const scalePCs = new Set(scale.pitchClasses);
    let diatonicChordCount = 0;
    let diatonicNotesCount = 0;
    let totalNotesCount = 0;

    selectedChords.forEach(chord => {
      const isChordDiatonic = chord.pitchClasses.every(pc => scalePCs.has(pc));
      if (isChordDiatonic) {
        diatonicChordCount++;
      }
      chord.pitchClasses.forEach(pc => {
        totalNotesCount++;
        if (scalePCs.has(pc)) diatonicNotesCount++;
      });
    });

    const matchScore = selectedChords.length > 0
      ? (diatonicChordCount / selectedChords.length) * 0.7 + (diatonicNotesCount / Math.max(1, totalNotesCount)) * 0.3
      : 1;

    return {
      scale,
      matchScore,
      diatonicChordCount,
      totalChords: selectedChords.length
    };
  });

  scaleEvaluations.sort((a, b) => b.matchScore - a.matchScore);
  return scaleEvaluations;
}

/* =========================================================
   SAVE SONG MODAL & CREATION
   ========================================================= */
function openSaveSongModal() {
  if (state.selectedChordIds.length === 0) {
    alert('Please select at least 1 chord before saving a song!');
    return;
  }

  const nextNum = state.userSongs.length + 1;
  document.getElementById('inputSongNumber').value = nextNum;
  document.getElementById('inputSongName').value = '';

  const selectEl = document.getElementById('selectDetectedScale');
  if (selectEl) {
    selectEl.innerHTML = '';

    if (state.appMode === 'scaleToChord') {
      const scale = SCALES_DATABASE.find(s => s.id === state.selectedScaleId);
      if (scale) {
        const opt = document.createElement('option');
        opt.value = scale.name;
        opt.textContent = `${scale.name} Scale (Selected Scale Key)`;
        selectEl.appendChild(opt);
      }
    }

    const evaluated = getEvaluatedScalesForCurrentChords();
    evaluated.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.scale.name;
      const fitText = item.totalChords > 0 ? ` (${item.diatonicChordCount}/${item.totalChords} Chords Fit)` : '';
      opt.textContent = `${item.scale.name} Scale${fitText}`;
      selectEl.appendChild(opt);
    });
  }

  const modal = document.getElementById('saveSongModal');
  if (modal) modal.classList.add('open');
}

function closeSaveSongModal() {
  const modal = document.getElementById('saveSongModal');
  if (modal) modal.classList.remove('open');
}

function handleSaveSongSubmit(e) {
  e.preventDefault();

  const numberVal = parseInt(document.getElementById('inputSongNumber').value, 10) || (state.userSongs.length + 1);
  const nameVal = document.getElementById('inputSongName').value.trim() || `Song #${numberVal}`;
  const langVal = document.getElementById('selectSongLanguage').value || 'english';
  const scaleName = document.getElementById('selectDetectedScale').value || 'C Major';

  const displayChords = state.selectedChordIds.map(cid => {
    const c = CHORDS_DATABASE.find(item => item.id === cid);
    return c ? c.shortName : cid;
  });

  const newSong = {
    id: Date.now(),
    number: numberVal,
    name: nameVal,
    language: langVal,
    chords: [...state.selectedChordIds],
    displayChords: displayChords,
    scaleName: scaleName
  };

  state.userSongs.push(newSong);
  saveUserSongsToStorage();
  saveSongToFirebase(newSong);

  closeSaveSongModal();
  alert(`✅ "${nameVal}" has been saved to your personal Songbook with scale: ${scaleName}!`);
}

/* =========================================================
   MODE 1: CHORD BANK RENDERING (60 CHORDS)
   ========================================================= */
function renderChordGrid() {
  const majorContainer = document.getElementById('majorChordsGrid');
  const minorContainer = document.getElementById('minorChordsGrid');
  const augContainer = document.getElementById('augmentedChordsGrid');
  const dimContainer = document.getElementById('diminishedChordsGrid');
  const seventhContainer = document.getElementById('seventhChordsGrid');

  if (!majorContainer) return;
  majorContainer.innerHTML = '';
  minorContainer.innerHTML = '';
  augContainer.innerHTML = '';
  dimContainer.innerHTML = '';
  seventhContainer.innerHTML = '';

  CHORDS_DATABASE.forEach(chord => {
    const isSelected = state.selectedChordIds.includes(chord.id);

    const btn = document.createElement('button');
    btn.className = `chord-button ${isSelected ? 'selected' : ''}`;
    btn.onclick = () => toggleChordSelection(chord.id);

    btn.onmouseenter = () => {
      updatePianoHighlights(chord.pitchClasses, []);
    };
    btn.onmouseleave = () => {
      syncPianoWithCurrentState();
    };

    btn.innerHTML = `
      <div class="chord-button-header">
        <span class="chord-name">${chord.shortName}</span>
        <span class="chord-type-badge ${chord.type}">${chord.type}</span>
      </div>
      <div class="chord-notes-row">
        <span class="chord-notes">${chord.notes.join(' - ')}</span>
        <button class="chord-play-btn" title="Play Chord" onclick="event.stopPropagation(); playChordAudio('${chord.id}')">
          🔊
        </button>
      </div>
    `;

    if (chord.type === 'major') majorContainer.appendChild(btn);
    else if (chord.type === 'minor') minorContainer.appendChild(btn);
    else if (chord.type === 'augmented') augContainer.appendChild(btn);
    else if (chord.type === 'diminished') dimContainer.appendChild(btn);
    else if (chord.type === 'seventh') seventhContainer.appendChild(btn);
  });
}

/* =========================================================
   PROGRESSION BAR RENDERING
   ========================================================= */
function renderProgressionBar() {
  const container = document.getElementById('progressionList');
  if (!container) return;
  container.innerHTML = '';

  if (state.selectedChordIds.length === 0) {
    container.innerHTML = `
      <div class="progression-empty">
        <span>✨ Click chord buttons below to build your song sequence...</span>
      </div>
    `;
    return;
  }

  state.selectedChordIds.forEach((chordId, idx) => {
    const chord = CHORDS_DATABASE.find(c => c.id === chordId);
    if (!chord) return;

    const chip = document.createElement('div');
    chip.className = 'chord-chip';
    chip.innerHTML = `
      <span>${idx + 1}. ${chord.shortName}</span>
      <span class="chord-chip-notes">${chord.notes.join('-')}</span>
      <span class="chord-chip-remove" title="Remove Chord" onclick="removeChordFromSequence(${idx})">✕</span>
    `;

    chip.onclick = (e) => {
      if (!e.target.classList.contains('chord-chip-remove')) {
        playChordAudio(chord.id);
      }
    };

    container.appendChild(chip);
  });
}

function toggleChordSelection(chordId) {
  const index = state.selectedChordIds.indexOf(chordId);
  if (index !== -1) {
    state.selectedChordIds.splice(index, 1);
  } else {
    state.selectedChordIds.push(chordId);
    playChordAudio(chordId);
  }

  if (state.appMode === 'scaleToChord') {
    renderScaleToChordFinder();
  } else {
    renderAll();
  }
  renderProgressionBar();
}

function removeChordFromSequence(idx) {
  state.selectedChordIds.splice(idx, 1);
  if (state.appMode === 'scaleToChord') {
    renderScaleToChordFinder();
  } else {
    renderAll();
  }
  renderProgressionBar();
}

function clearAllChords() {
  state.selectedChordIds = [];
  if (state.appMode === 'scaleToChord') {
    renderScaleToChordFinder();
  } else {
    renderAll();
  }
  renderProgressionBar();
}

/* =========================================================
   MODE 1: SCALE RESULTS RENDERING
   ========================================================= */
function renderScaleResults() {
  const container = document.getElementById('scalesResults');
  const countBadge = document.getElementById('matchingScalesCount');
  if (!container || !countBadge) return;

  container.innerHTML = '';

  if (state.selectedChordIds.length === 0) {
    countBadge.textContent = '0 Scales';
    container.innerHTML = `
      <div class="empty-results-state">
        <div class="empty-icon-circle">🎹</div>
        <h3 class="empty-title">No Chords Selected Yet</h3>
        <p class="empty-desc">
          Click chord buttons below to instantly find matching Major and Natural Minor scales with full diatonic Roman Numeral analysis.
        </p>
      </div>
    `;
    return;
  }

  const selectedChords = state.selectedChordIds
    .map(id => CHORDS_DATABASE.find(c => c.id === id))
    .filter(Boolean);

  const scaleEvaluations = SCALES_DATABASE.map(scale => {
    const scalePCs = new Set(scale.pitchClasses);
    let diatonicChordCount = 0;
    let diatonicNotesCount = 0;
    let totalNotesCount = 0;

    selectedChords.forEach(chord => {
      const isChordDiatonic = chord.pitchClasses.every(pc => scalePCs.has(pc));
      if (isChordDiatonic) {
        diatonicChordCount++;
      }
      chord.pitchClasses.forEach(pc => {
        totalNotesCount++;
        if (scalePCs.has(pc)) diatonicNotesCount++;
      });
    });

    const isPerfectMatch = diatonicChordCount === selectedChords.length;
    const matchScore = (diatonicChordCount / selectedChords.length) * 0.7 + (diatonicNotesCount / totalNotesCount) * 0.3;

    return {
      scale,
      isPerfectMatch,
      diatonicChordCount,
      totalChords: selectedChords.length,
      matchScore: matchScore,
      diatonicChords: getDiatonicChordsForScale(scale)
    };
  });

  scaleEvaluations.sort((a, b) => {
    if (a.isPerfectMatch && !b.isPerfectMatch) return -1;
    if (!a.isPerfectMatch && b.isPerfectMatch) return 1;
    return b.matchScore - a.matchScore;
  });

  countBadge.textContent = `${scaleEvaluations.filter(e => e.isPerfectMatch).length} Perfect Match${scaleEvaluations.filter(e => e.isPerfectMatch).length === 1 ? '' : 'es'}`;

  scaleEvaluations.forEach(ev => {
    const { scale, isPerfectMatch, diatonicChordCount, totalChords, diatonicChords } = ev;

    if (diatonicChordCount === 0 && totalChords > 2) return;

    const card = document.createElement('div');
    card.className = `scale-card ${isPerfectMatch ? 'perfect-match' : ''}`;

    card.onmouseenter = () => {
      updatePianoHighlights([], scale.pitchClasses);
    };
    card.onmouseleave = () => {
      syncPianoWithCurrentState();
    };

    const selectedSet = new Set(state.selectedChordIds);

    const notesHtml = scale.notes.map(noteName => {
      const isNoteInSong = selectedChords.some(ch => ch.notes.includes(noteName));
      return `<span class="scale-note-badge ${isNoteInSong ? 'in-song' : ''}">${noteName}</span>`;
    }).join('');

    const diatonicChordsHtml = diatonicChords.map(item => {
      const isSelected = selectedSet.has(item.chord.id);
      return `
        <div class="diatonic-chord-item ${isSelected ? 'active-song-chord' : ''}" onclick="toggleChordSelection('${item.chord.id}')">
          <span class="roman-numeral">${item.numeral}</span>
          <span class="diatonic-chord-name">${item.chord.shortName}</span>
        </div>
      `;
    }).join('');

    card.innerHTML = `
      <div class="scale-card-header">
        <div class="scale-title-wrapper">
          <h3 class="scale-name">${scale.name} Scale</h3>
          ${isPerfectMatch 
            ? `<span class="match-badge perfect">★ 100% Perfect Scale Match</span>` 
            : `<span class="match-badge partial">${diatonicChordCount}/${totalChords} Chords Fit</span>`}
        </div>
        <div class="scale-actions">
          <button class="btn btn-secondary" onclick="playScaleAudio('${scale.id}')">
            🔊 Play Scale
          </button>
        </div>
      </div>

      <div class="scale-notes-row">
        ${notesHtml}
      </div>

      <div class="diatonic-analysis-row">
        <span class="diatonic-label">Harmonic Chords in this Scale (Click to select):</span>
        <div class="diatonic-chords-list">
          ${diatonicChordsHtml}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderAll() {
  renderChordGrid();
  renderProgressionBar();
  renderScaleResults();
  syncPianoWithCurrentState();
}

/* =========================================================
   FIREBASE CLOUD STORAGE & SYNCHRONIZATION ENGINE
   ========================================================= */
function initFirebase() {
  try {
    const enabledStr = localStorage.getItem('scaleFinder_firebaseEnabled');
    state.firebaseEnabled = enabledStr === 'true';

    const savedCfgStr = localStorage.getItem('scaleFinder_firebaseConfig');
    if (savedCfgStr) {
      state.firebaseConfig = JSON.parse(savedCfgStr);
    } else {
      state.firebaseConfig = { ...DEFAULT_FIREBASE_CONFIG };
    }

    if (state.firebaseEnabled && typeof firebase !== 'undefined') {
      const cfg = state.firebaseConfig;
      if (cfg && cfg.apiKey && cfg.apiKey !== 'YOUR_API_KEY') {
        if (!firebase.apps.length) {
          firebase.initializeApp(cfg);
        }
        state.firestoreDb = firebase.firestore();
        state.firebaseConnected = true;
      } else {
        state.firebaseConnected = false;
      }
    } else {
      state.firebaseConnected = false;
    }
  } catch (err) {
    console.error('Firebase Initialization Error:', err);
    state.firebaseConnected = false;
  }
  updateFirebaseStatusUI();
}

function updateFirebaseStatusUI() {
  const badgeEl = document.getElementById('firebaseStatusBadge');
  const btnEl = document.getElementById('firebaseConfigBtn');
  const dotEl = document.getElementById('firebaseStatusDot');
  const detailTextEl = document.getElementById('firebaseStatusDetailText');
  const boxEl = document.getElementById('firebaseStatusBox');

  if (!badgeEl) return;

  if (state.firebaseConnected && state.firebaseEnabled) {
    badgeEl.textContent = '☁️ Firebase: Synced (Cloud)';
    if (btnEl) btnEl.classList.add('synced');
    if (boxEl) {
      boxEl.className = 'firebase-status-box connected';
    }
    if (detailTextEl) detailTextEl.textContent = 'Status: Connected & Synchronized with Firestore Cloud';
  } else if (state.firebaseEnabled) {
    badgeEl.textContent = '☁️ Firebase: Config Needed';
    if (btnEl) btnEl.classList.remove('synced');
    if (boxEl) {
      boxEl.className = 'firebase-status-box error';
    }
    if (detailTextEl) detailTextEl.textContent = 'Status: Firebase enabled but API configuration is missing/invalid.';
  } else {
    badgeEl.textContent = '☁️ Firebase: Local / Setup';
    if (btnEl) btnEl.classList.remove('synced');
    if (boxEl) {
      boxEl.className = 'firebase-status-box';
    }
    if (detailTextEl) detailTextEl.textContent = 'Status: Local Storage Active (Cloud Sync Disabled)';
  }
}

function openFirebaseConfigModal() {
  const modal = document.getElementById('firebaseConfigModal');
  if (!modal) return;

  const chk = document.getElementById('enableFirebaseCheckbox');
  if (chk) chk.checked = !!state.firebaseEnabled;

  const cfg = state.firebaseConfig || DEFAULT_FIREBASE_CONFIG;
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val !== 'YOUR_API_KEY' && !val.startsWith('YOUR_') ? (val || '') : '';
  };

  setVal('firebaseApiKey', cfg.apiKey);
  setVal('firebaseProjectId', cfg.projectId);
  setVal('firebaseAppId', cfg.appId);
  setVal('firebaseAuthDomain', cfg.authDomain);
  setVal('firebaseStorageBucket', cfg.storageBucket);

  updateFirebaseStatusUI();
  modal.classList.add('open');
}

function closeFirebaseConfigModal() {
  const modal = document.getElementById('firebaseConfigModal');
  if (modal) modal.classList.remove('open');
}

function toggleFirebaseEnabled(isChecked) {
  state.firebaseEnabled = isChecked;
  localStorage.setItem('scaleFinder_firebaseEnabled', isChecked ? 'true' : 'false');
  initFirebase();
}

function saveAndConnectFirebase() {
  const apiKey = document.getElementById('firebaseApiKey')?.value.trim();
  const projectId = document.getElementById('firebaseProjectId')?.value.trim();
  const appId = document.getElementById('firebaseAppId')?.value.trim();
  const authDomain = document.getElementById('firebaseAuthDomain')?.value.trim() || (projectId ? `${projectId}.firebaseapp.com` : '');
  const storageBucket = document.getElementById('firebaseStorageBucket')?.value.trim() || (projectId ? `${projectId}.appspot.com` : '');

  const newConfig = {
    apiKey: apiKey || DEFAULT_FIREBASE_CONFIG.apiKey,
    authDomain: authDomain || DEFAULT_FIREBASE_CONFIG.authDomain,
    projectId: projectId || DEFAULT_FIREBASE_CONFIG.projectId,
    storageBucket: storageBucket || DEFAULT_FIREBASE_CONFIG.storageBucket,
    messagingSenderId: DEFAULT_FIREBASE_CONFIG.messagingSenderId,
    appId: appId || DEFAULT_FIREBASE_CONFIG.appId
  };

  state.firebaseConfig = newConfig;
  state.firebaseEnabled = true;
  localStorage.setItem('scaleFinder_firebaseConfig', JSON.stringify(newConfig));
  localStorage.setItem('scaleFinder_firebaseEnabled', 'true');

  const chk = document.getElementById('enableFirebaseCheckbox');
  if (chk) chk.checked = true;

  initFirebase();

  if (state.firebaseConnected) {
    alert('✅ Firebase successfully configured! Testing cloud sync...');
    syncSongsFromFirebaseNow();
  } else {
    alert('⚠️ Saved configuration, but API Key / Project ID may be required to establish live Firestore connection.');
  }
}

async function saveSongToFirebase(song) {
  if (!state.firebaseConnected || !state.firestoreDb) return;
  try {
    await state.firestoreDb.collection('scaleFinder_songs').doc(String(song.id)).set({
      ...song,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log('Successfully synced song to Firebase Firestore:', song.name);
  } catch (err) {
    console.warn('Could not sync song to Firebase:', err);
  }
}

async function deleteSongFromFirebase(songId) {
  if (!state.firebaseConnected || !state.firestoreDb) return;
  try {
    await state.firestoreDb.collection('scaleFinder_songs').doc(String(songId)).delete();
    console.log('Successfully deleted song from Firebase Firestore:', songId);
  } catch (err) {
    console.warn('Could not delete song from Firebase:', err);
  }
}

async function syncSongsFromFirebaseNow() {
  if (!state.firebaseConnected || !state.firestoreDb) {
    alert('Please enable Firebase and enter your API credentials first.');
    return;
  }
  try {
    const snapshot = await state.firestoreDb.collection('scaleFinder_songs').get();
    const cloudSongs = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      cloudSongs.push(data);
    });

    // Merge cloud songs with local songs (deduplicate by id)
    const mergedMap = new Map();
    state.userSongs.forEach(s => mergedMap.set(String(s.id), s));
    cloudSongs.forEach(cs => mergedMap.set(String(cs.id), cs));

    state.userSongs = Array.from(mergedMap.values()).sort((a, b) => a.number - b.number);
    saveUserSongsToStorage();
    renderSongLibraryTable();

    alert(`✅ Cloud Sync Complete! Loaded ${cloudSongs.length} songs from Firebase Firestore.`);
  } catch (err) {
    console.error('Firebase Sync Error:', err);
    alert(`❌ Cloud Sync Failed: ${err.message}`);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadUserSongs();
  initFirebase();
  renderPianoKeyboard();
  renderAll();

  const searchInput = document.getElementById('songSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', handleSongSearchInput);
  }

  document.querySelectorAll('#languageButtonsGroup .lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setSongLanguageFilter(btn.dataset.lang));
  });

  const form = document.getElementById('saveSongForm');
  if (form) {
    form.addEventListener('submit', handleSaveSongSubmit);
  }
});
