import Image from 'next/image';

type Props = {
    imgSrc: string,
    imgAlt: string,
    title: string
}

export default function Hero({ imgSrc, title, imgAlt }: Props) {
    return (
        <div className='relative h-screen'>
            <div className="absolute -z-10 inset-0">
                <Image
                    src={imgSrc}
                    alt={imgAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                />
                <div className='absolute inset-0 bg-gradient-to-r from-slate-900' />
            </div>
            <div className='pt-48 flex justify-center items-center'>
                <h1 className='text-white text-6xl'>{title}</h1>
            </div>
        </div>
    )
}
