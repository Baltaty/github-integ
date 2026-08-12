// Retries a failed delivery with an exponential backoff.
export function send(payload, attempt = 0) {
  return post(payload).catch(() =>
    attempt < 5 ? wait(2 ** attempt).then(() => send(payload, attempt + 1)) : null,
  );
}
