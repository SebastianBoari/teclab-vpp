const CountdownBanner = ({ daysRemaining }) => {
  const plural = daysRemaining === 1 ? 'día' : 'días'
  
  return (  
    <header className='bg-primary/10 dark:bg-primary/20 w-full absolute top-0 left-0'>
        <div className='container mx-auto px-4 py-2'>
            <p className='text-center text-sm font-medium text-primary'>Tienes { daysRemaining } { plural } para seleccionar tu grupo.</p>
        </div>
    </header>
  )
}

export default CountdownBanner