import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countSafe',
  pure: true 
})
export class CountSafePipe implements PipeTransform {
  transform(value?: any[] | Set<any> | Map<any, any> | string | null): number {
    if (!value) return 0;

    if (Array.isArray(value)) return value.length;
    if (value instanceof Set || value instanceof Map) return value.size;
    if (typeof value === 'string') return value.length;

    if ((value as any).length !== undefined && typeof (value as any).length === 'number') {
      return (value as any).length;
    }

    return 0;
  }
}
