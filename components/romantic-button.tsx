import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RomanticButtonProps extends ButtonProps {
  variant?: 'romantic' | 'romantic-outline' | 'romantic-ghost';
}

export function RomanticButton({ 
  variant = 'romantic', 
  className, 
  children, 
  ...props 
}: RomanticButtonProps) {
  const baseClasses = "transition-all duration-300 ease-in-out transform hover:scale-105";

  const variantClasses = cn({
    'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white': 
      variant === 'romantic',
    'border-2 border-pink-500 text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20':
      variant === 'romantic-outline',
    'text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20':
      variant === 'romantic-ghost',
  });

  return (
    <Button
      className={cn(baseClasses, variantClasses, className)}
      {...props}
    >
      {children}
    </Button>
  );
}