import { Card, CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface RomanticCardProps extends CardProps {
  variant?: 'romantic' | 'romantic-light' | 'romantic-dark';
}

export function RomanticCard({ 
  variant = 'romantic', 
  className, 
  children, 
  ...props 
}: RomanticCardProps) {
  const variantClasses = cn({
    'bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800 border-pink-200 dark:border-pink-700': 
      variant === 'romantic',
    'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-700':
      variant === 'romantic-light',
    'bg-gradient-to-br from-pink-900/30 to-rose-900/30 dark:from-pink-900/50 dark:to-rose-900/50 border-pink-700':
      variant === 'romantic-dark',
  });

  return (
    <Card
      className={cn(variantClasses, className)}
      {...props}
    >
      {children}
    </Card>
  );
}