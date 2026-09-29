function redactText(text, verifiedFlags) {
  let redacted = text;
  // Sort flags by length descending so that longer spans are replaced first
  // to avoid partial overlaps causing issues.
  const sortedFlags = [...verifiedFlags].sort((a, b) => b.span.length - a.span.length);
  
  for (const flag of sortedFlags) {
    // Replace all occurrences of the span securely.
    redacted = redacted.split(flag.span).join(`[REDACTED-${flag.category.toUpperCase()}]`);
  }
  return redacted;
}

module.exports = {
  redactText
};
