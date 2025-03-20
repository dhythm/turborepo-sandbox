export function hello(name: string) {
  return `Hello, ${name}!`;
}

export async function goodbye() {
  const response = await fetch("/api/user");
  const user = await response.json();
  return `Goodbye, ${user.name}!`;
}
