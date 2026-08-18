import { BsArrowRight } from 'react-icons/bs';

export default function LearnMore({ text = "Learn more" }: { text?: string; }) {
    return (
        <div className='flex items-center gap-3'>
            <p>{text}</p>
            <div className='relative w-0 group-hover:w-4 h-4 overflow-hidden duration-300'>
                <BsArrowRight
                    className='absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0'
                />
            </div>
        </div>
    )
}
