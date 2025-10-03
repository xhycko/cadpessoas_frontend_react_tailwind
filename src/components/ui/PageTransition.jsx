import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/design-system';

/**
 * Componente para transições suaves entre páginas
 */
const PageTransition = ({ 
  children, 
  className = '',
  animation = 'fade',
  duration = 300,
  delay = 0,
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animations = {
    fade: {
      enter: 'animate-fade-in',
      initial: 'opacity-0',
    },
    slideUp: {
      enter: 'animate-slide-up',
      initial: 'opacity-0 translate-y-4',
    },
    slideDown: {
      enter: 'animate-slide-down',
      initial: 'opacity-0 -translate-y-4',
    },
    slideLeft: {
      enter: 'animate-slide-left',
      initial: 'opacity-0 translate-x-4',
    },
    slideRight: {
      enter: 'animate-slide-right',
      initial: 'opacity-0 -translate-x-4',
    },
    scale: {
      enter: 'animate-scale-in',
      initial: 'opacity-0 scale-95',
    },
    bounce: {
      enter: 'animate-bounce-gentle',
      initial: 'opacity-0 scale-95',
    },
  };

  const animationClasses = animations[animation] || animations.fade;

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-smooth',
        isVisible ? animationClasses.enter : animationClasses.initial,
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Wrapper para animações de lista
 */
export const ListTransition = ({ 
  children, 
  className = '',
  stagger = 50,
  ...props 
}) => {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {React.Children.map(children, (child, index) => (
        <PageTransition
          key={index}
          animation="slideUp"
          delay={index * stagger}
        >
          {child}
        </PageTransition>
      ))}
    </div>
  );
};

/**
 * Componente para hover animations
 */
export const HoverAnimation = ({ 
  children, 
  className = '',
  animation = 'lift',
  ...props 
}) => {
  const animations = {
    lift: 'hover:-translate-y-1 hover:shadow-lg',
    scale: 'hover:scale-105',
    rotate: 'hover:rotate-1',
    pulse: 'hover:animate-pulse',
    bounce: 'hover:animate-bounce-gentle',
    glow: 'hover:shadow-lg hover:shadow-primary-500/25',
  };

  return (
    <div
      className={cn(
        'transition-all duration-200 ease-smooth cursor-pointer',
        animations[animation],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Componente para micro-interações
 */
export const MicroInteraction = ({ 
  children, 
  className = '',
  trigger = 'hover',
  animation = 'scale',
  ...props 
}) => {
  const [isTriggered, setIsTriggered] = useState(false);

  const animations = {
    scale: isTriggered ? 'scale-110' : 'scale-100',
    rotate: isTriggered ? 'rotate-12' : 'rotate-0',
    bounce: isTriggered ? 'animate-bounce-gentle' : '',
    pulse: isTriggered ? 'animate-pulse' : '',
    wiggle: isTriggered ? 'animate-wiggle' : '',
  };

  const handleTrigger = () => {
    setIsTriggered(true);
    setTimeout(() => setIsTriggered(false), 300);
  };

  const triggerProps = {
    hover: {
      onMouseEnter: () => setIsTriggered(true),
      onMouseLeave: () => setIsTriggered(false),
    },
    click: {
      onClick: handleTrigger,
    },
    focus: {
      onFocus: () => setIsTriggered(true),
      onBlur: () => setIsTriggered(false),
    },
  };

  return (
    <div
      className={cn(
        'transition-all duration-200 ease-smooth',
        animations[animation],
        className
      )}
      {...triggerProps[trigger]}
      {...props}
    >
      {children}
    </div>
  );
};

export default PageTransition;