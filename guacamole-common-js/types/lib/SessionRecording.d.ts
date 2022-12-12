import { Display } from "./Display";
import { Tunnel } from "./Tunnel";

export class SessionRecording {
  constructor(source: Tunnel | Blob);

  /**
   * Fired when loading of this recording has completed and all frames
   * are available.
   *
   * @event
   */
  onload: (() => void) | null;

  /**
   * Fired when an error occurs which prevents the recording from being
   * played back.
   *
   * @event
   * @param {!string} message
   *     A human-readable message describing the error that occurred.
   */
  onerror: ((message: string) => void) | null;

  /**
   * Fired whenever playback of the recording has started.
   *
   * @event
   */
  onabort: (() => void) | null;

  /**
   * Fired when new frames have become available while the recording is
   * being downloaded.
   *
   * @event
   * @param {!number} duration
   *     The new duration of the recording, in milliseconds.
   *
   * @param {!number} parsedSize
   *     The number of bytes that have been loaded/parsed.
   */
  onprogress: ((duration: number, parsedSize: number) => void) | null;

  /**
   * Fired whenever playback of the recording has started.
   *
   * @event
   */
  onplay: (() => void) | null;

  /**
   * Fired whenever playback of the recording has been paused. This may
   * happen when playback is explicitly paused with a call to pause(), or
   * when playback is implicitly paused due to reaching the end of the
   * recording.
   *
   * @event
   */
  onpause: (() => void) | null;

  /**
   * Fired whenever the playback position within the recording changes.
   *
   * @event
   * @param {!number} position
   *     The new position within the recording, in milliseconds.
   *
   * @param {!number} current
   *     The number of frames that have been seeked through. If not
   *     seeking through multiple frames due to a call to seek(), this
   *     will be 1.
   *
   * @param {!number} total
   *     The number of frames that are being seeked through in the
   *     current seek operation. If not seeking through multiple frames
   *     due to a call to seek(), this will be 1.
   */
  onseek: ((position: number, current: number, total: number) => void) | null;

  /**
   * Connects the underlying tunnel, beginning download of the Guacamole
   * session. Playback of the Guacamole session cannot occur until at least
   * one frame worth of instructions has been downloaded. If the underlying
   * recording source is a Blob, this function has no effect.
   *
   * @param {string} [data]
   *     The data to send to the tunnel when connecting.
   */
  connect: (data: string) => void;

  /**
   * Disconnects the underlying tunnel, stopping further download of the
   * Guacamole session. If the underlying recording source is a Blob, this
   * function has no effect.
   */
  disconnect: () => void;

  /**
   * Aborts the loading process, stopping further processing of the
   * provided data. If the underlying recording source is a Guacamole tunnel,
   * it will be disconnected.
   */
  abort: () => void;

  /**
   * Returns the underlying display of the Guacamole.Client used by this
   * Guacamole.SessionRecording for playback. The display contains an Element
   * which can be added to the DOM, causing the display (and thus playback of
   * the recording) to become visible.
   *
   * @return {!Guacamole.Display}
   *     The underlying display of the Guacamole.Client used by this
   *     Guacamole.SessionRecording for playback.
   */
  getDisplay: () => Display;

  /**
   * Returns whether playback is currently in progress.
   *
   * @returns {!boolean}
   *     true if playback is currently in progress, false otherwise.
   */
  isPlaying: () => boolean;

  /**
   * Returns the current playback position within the recording, in
   * milliseconds, where zero is the start of the recording.
   *
   * @returns {!number}
   *     The current playback position within the recording, in milliseconds.
   */
  getPosition: () => number;

  /**
   * Returns the duration of this recording, in milliseconds. If the
   * recording is still being downloaded, this value will gradually increase.
   *
   * @returns {!number}
   *     The duration of this recording, in milliseconds.
   */
  getDuration: () => number;

  /**
   * Begins continuous playback of the recording downloaded thus far.
   * Playback of the recording will continue until pause() is invoked or
   * until no further frames exist. Playback is initially paused when a
   * Guacamole.SessionRecording is created, and must be explicitly started
   * through a call to this function. If playback is already in progress,
   * this function has no effect. If a seek operation is in progress,
   * playback resumes at the current position, and the seek is aborted as if
   * completed.
   */
  play: () => void;

  /**
   * Seeks to the given position within the recording. If the recording is
   * currently being played back, playback will continue after the seek is
   * performed. If the recording is currently paused, playback will be
   * paused after the seek is performed. If a seek operation is already in
   * progress, that seek is first aborted. The seek operation will proceed
   * asynchronously.
   *
   * @param {!number} position
   *     The position within the recording to seek to, in milliseconds.
   *
   * @param {function} [callback]
   *     The callback to invoke once the seek operation has completed.
   */
  seek: (position: number, callback?: () => void) => void;

  /**
   * Cancels the current seek operation, setting the current frame of the
   * recording to wherever the seek operation was able to reach prior to
   * being cancelled. If a callback was provided to seek(), that callback
   * is invoked. If a seek operation is not currently underway, this
   * function has no effect.
   */
  cancel: () => void;

  /**
   * Pauses playback of the recording, if playback is currently in progress.
   * If playback is not in progress, this function has no effect. If a seek
   * operation is in progress, the seek is aborted. Playback is initially
   * paused when a Guacamole.SessionRecording is created, and must be
   * explicitly started through a call to play().
   */
  pause: () => void;
}
