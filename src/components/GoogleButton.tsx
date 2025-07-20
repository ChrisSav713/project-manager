type Props = {
  onClick: () => void
  label?: string
}

const GoogleButton = ({ onClick, label = 'Continue with Google' }: Props) => {
  return (
    <button
      onClick={onClick}
      className='w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-2 px-4 hover:shadow-md transition'
    >
      <img
        src='https://www.svgrepo.com/show/475656/google-color.svg'
        alt='Google logo'
        className='w-5 h-5'
      />
      <span className='text-sm font-medium text-gray-700'>{label}</span>
    </button>
  )
}

export default GoogleButton
