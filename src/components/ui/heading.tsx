interface HeadingProps {
  title: string
  description: string
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className='space-y-2 mb-2'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <p className='text-sm font-light text-foreground'>{description}</p>
    </div>
  )
}

export default Heading
