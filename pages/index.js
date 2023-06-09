import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import Head from "next/head";
function HomePage(props) {
  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="LOREM IPSUM DOR AMEN NAME NAME AAEEQRL"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}
export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
      revalidate: 1800
    },
  };
}
