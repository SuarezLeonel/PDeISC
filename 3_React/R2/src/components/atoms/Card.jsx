const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  ...props
}) => {
  const isClickable = Boolean(onClick)

  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-xl shadow-sm
        ${hoverable || isClickable ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-600' : ''}
        transition-all duration-300 ease-out
        ${isClickable ? 'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
