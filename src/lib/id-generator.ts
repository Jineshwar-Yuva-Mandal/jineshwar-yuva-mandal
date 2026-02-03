export async function generateUniqueId(firstName: string, lastName: string, existingIds: string[]) {
  const base = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@jym.rajajinagar`;
  
  if (!existingIds.includes(base)) {
    return base;
  }

  let counter = 2;
  while (true) {
    const suffix = counter < 10 ? `0${counter}` : counter.toString();
    const candidate = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${suffix}@jym.rajajinagar`;
    
    if (!existingIds.includes(candidate)) {
      return candidate;
    }
    counter++;
  }
}