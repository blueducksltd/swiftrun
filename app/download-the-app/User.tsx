import Link from 'next/link'

export default function User() {
  return (
    <>
     <div className="flex flex-col gap-5 ">
        <h1 className="h-fit font-heading text-5xl md:text-7xl font-extrabold text-blue ">
          Speed, Safety, Comfort.
        </h1>
        <div>
          <p className="text-lg text-black  h-fit ">
            We&rsquo;ve gathered answers to the questions users ask most, so you
            can get help faster.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Link
            className="bg-cloudmist text-blue p-3 rounded-full text-center h-fit"
            href=""
          >
            
          </Link>
        </div>
      </div>
      <div className="grid gap-6"></div>
    </>
  )
}
