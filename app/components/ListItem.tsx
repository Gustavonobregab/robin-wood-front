import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';
import { cn } from './cn';

// ============================================
// LIST ITEM - Standard list row
// Based on dashboard recentFiles pattern
// ============================================

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  meta?: string;
  children?: ReactNode;
}

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  ({ icon, title, description, meta, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer',
          className
        )}
        {...props}
      >
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-manrope text-sm font-medium text-slate-900 truncate">
            {title}
          </p>
          {description && (
            <p className="font-manrope text-xs text-slate-500 truncate">
              {description}
            </p>
          )}
        </div>
        {meta && (
          <span className="font-manrope text-xs text-slate-400 whitespace-nowrap">
            {meta}
          </span>
        )}
        {children}
      </div>
    );
  }
);
ListItem.displayName = 'ListItem';

// ============================================
// LIST ITEM LINK - Clickable list row with navigation
// Based on dashboard quickActions pattern
// ============================================

interface ListItemLinkProps {
  href: string;
  icon?: ReactNode;
  title: string;
  description?: string;
  meta?: string;
  className?: string;
}

export function ListItemLink({
  href,
  icon,
  title,
  description,
  meta,
  className,
}: ListItemLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-slate-100 transition-colors',
        className
      )}
    >
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-manrope text-sm font-medium text-slate-900">
          {title}
        </p>
        {description && (
          <p className="font-manrope text-xs text-slate-500">{description}</p>
        )}
      </div>
      {meta && (
        <span className="font-manrope text-xs text-slate-400 whitespace-nowrap">
          {meta}
        </span>
      )}
    </Link>
  );
}

// ============================================
// LIST CONTAINER - Wrapper for list items
// ============================================

interface ListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const List = forwardRef<HTMLDivElement, ListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-1', className)} {...props}>
        {children}
      </div>
    );
  }
);
List.displayName = 'List';
