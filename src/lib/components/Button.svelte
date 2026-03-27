<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onclick?: (e: MouseEvent) => void;
  }

  let { variant = 'primary', size = 'md', disabled = false, onclick, class: className = '' }: Props & { class?: string } = $props();
</script>

<button class={`btn btn-${variant} btn-${size} ${className}`} {disabled} {onclick}>
  <slot />
</button>

<style>
  .btn {
    border: none;
    border-radius: var(--radius-md);
    font-family: inherit;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Variants */
  .btn-primary {
    background: var(--accent-primary);
    color: var(--bg-primary);
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--accent-secondary);
    box-shadow: var(--shadow-md);
  }

  .btn-secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
  }

  .btn-secondary:hover:not(:disabled) {
    background: var(--bg-tertiary);
    border-color: var(--accent-primary);
  }

  /* Sizes */
  .btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .btn-md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  .btn-lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
</style>