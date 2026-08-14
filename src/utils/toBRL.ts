/**
 * Convert to BRL currency format
 * @param value - The value to convert
 * @returns The equivalent BRL currency format as a string
 */
export function toBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
