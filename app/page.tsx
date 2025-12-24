import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { events } from '@/lib/constants'


const Home = () => {
  return (
    <section>
      <h1 className='text-center'>All the dev Events <br/> You Can't Miss OUT.</h1>
      <p className='text-center mt-5'>Hackatons, Meetups, and Conferences, ALL IN ONE PLACE</p>
      <ExploreBtn />

      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <ul className='events'>
          {events.map((event) => (
            <li key={event.slug}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Home