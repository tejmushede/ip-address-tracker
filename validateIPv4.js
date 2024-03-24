function isValidIPv4(ip) {
  const octets = ip.split(".");

  console.log(octets.length);

  if (octets.length !== 4) {
    return false;
  } 

  for (const octet of octets){
    
    const digit = Number(octet);
    
    if (isNaN(digit) || digit < 0 || digit > 255 || octet !== String(digit)){
      return false
    }
  }

  return true

}

// Example usage:
console.log(isValidIPv4("192.168.1.00")); // true
console.log(isValidIPv4("256.168.0.1")); // false
