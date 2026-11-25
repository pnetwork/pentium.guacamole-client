/**
 * Provides support for parsing multi-byte UTF-8 encoded text into a string by
 * feeding it, chunk by chunk, buffers of raw bytes. Incomplete multi-byte
 * sequences at the end of a chunk are retained and completed by the next
 * call to decode().
 */
export class UTF8Parser {
    /**
     * Decodes the given UTF-8 data into a Unicode string, returning a string
     * containing all complete UTF-8 characters within the provided data and
     * saving any incomplete characters for the next call to decode().
     *
     * @param buffer The UTF-8 data to decode.
     * @return The decoded Unicode string.
     */
    decode(buffer: ArrayBuffer): string;
}
