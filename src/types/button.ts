import { CSSProperties } from 'vue'

export interface ButtonAttrs {
  style?: CSSProperties,
  type?: 'default' | 'primary' | 'warning' | 'danger' | 'success',
  size?: 'default' | 'small' | 'large',
  color?: string,
  plain?: boolean,
  disabled?: boolean,
  block?: boolean,
  circle?: boolean,
  round?: boolean,
  loading?: boolean,
  icon?: string,
  btntext?: string,
  iconPosition?: 'left' | 'right',
  loadingText?: string,
  loadingType?: 'circular' | 'spinner',
  url?: string,
  to?: string,
  replace?: boolean
}