import React from "react";
import styles from "../styles/MoreEvents.module.css";
import { FaHeart } from "react-icons/fa";
const MoreEvents = () => {
  return (
    <div className={styles.container}>
      <div className={styles.events_header}>
        <h3>Upcoming Events</h3>

        <div className={styles.filters}>
          <div className={styles.events_type}>
            <select name="" id="">
              <option value="">Event Type</option>
              <option value="">Online</option>
              <option value="">Physical</option>
            </select>
          </div>

          <div className={styles.events_category}>
            <select name="" id="">
              <option value="">Category</option>
              <option value="">Tech</option>
              <option value="">Farming</option>
              <option value="">Business</option>
              <option value="">Seminar</option>
              <option value="">Explainer</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.events_body}>
        <div className={styles.event_item}>
          <div className={styles.event_image}>
            <img
              src="/party.jpg"
              
              alt="no photo"
              className={styles.image}
            />
          </div>
          <div className={styles.info}>
            <span>$15</span>
            <FaHeart className={styles.heart_icon} />
          </div>

          <div className={styles.event_desc}>
            <div className={styles.event_date}>
              <h3>OCT</h3>
              <h3>12</h3>
            </div>

            <div className={styles.events_explain}>
              <h3>Nakuru Karaoke</h3>
              <span>
                Lorem ipsum, in graphical and textual context, refers to filler
                text that is placed in a document or visual presentation. Lorem
                ipsum is derived from the Latin "dolorem ipsum" roughly
                translated as "pain itself."
              </span>
            </div>
          </div>
        </div>

        <div className={styles.event_item}>
          <div className={styles.event_image}>
            <Image
              src="/party5.jpg"
              height={300}
              width={428}
              alt="no photo"
              className={styles.image}
            />
          </div>
          <div className={styles.info}>
            <span>FREE</span>
            <FaHeart className={styles.heart_icon} />
          </div>

          <div className={styles.event_desc}>
            <div className={styles.event_date}>
              <h3>DEC</h3>
              <h3>18</h3>
            </div>

            <div className={styles.events_explain}>
              <h3>Nairobi Club Event</h3>
              <span>
                Lorem ipsum, in graphical and textual context, refers to filler
                text that is placed in a document or visual presentation. Lorem
                ipsum is derived from the Latin "dolorem ipsum" roughly
                translated as "pain itself."
              </span>
            </div>
          </div>
        </div>
        <div className={styles.event_item}>
          <div className={styles.event_image}>
            <Image
              src="/party4.jpg"
              height={300}
              width={428}
              alt="no photo"
              className={styles.image}
            />
          </div>
          <div className={styles.info}>
            <span>$30</span>
            <FaHeart className={styles.heart_icon} />
          </div>

          <div className={styles.event_desc}>
            <div className={styles.event_date}>
              <h3>DEC</h3>
              <h3>18</h3>
            </div>

            <div className={styles.events_explain}>
              <h3>Whites Party</h3>
              <span>
                Lorem ipsum, in graphical and textual context, refers to filler
                text that is placed in a document or visual presentation. Lorem
                ipsum is derived from the Latin "dolorem ipsum" roughly
                translated as "pain itself."
              </span>
            </div>
          </div>
        </div>
        <div className={styles.event_item}>
          <div className={styles.event_image}>
            <Image
              src="/party5.jpg"
              height={300}
              width={428}
              alt="no photo"
              className={styles.image}
            />
          </div>
          <div className={styles.info}>
            <span>Free</span>
            <FaHeart className={styles.heart_icon} />
          </div>

          <div className={styles.event_desc}>
            <div className={styles.event_date}>
              <h3>DEC</h3>
              <h3>18</h3>
            </div>

            <div className={styles.events_explain}>
              <h3>Mombasa Pirates Party</h3>
              <span>
                Lorem ipsum, in graphical and textual context, refers to filler
                text that is placed in a document or visual presentation. Lorem
                ipsum is derived from the Latin "dolorem ipsum" roughly
                translated as "pain itself."
              </span>
            </div>
          </div>
        </div>
        <div className={styles.event_item}>
          <div className={styles.event_image}>
            <Image
              src="/party2.jpg"
              height={300}
              width={428}
              alt="no photo"
              className={styles.image}
            />
          </div>
          <div className={styles.info}>
            <span>$50</span>
            <FaHeart className={styles.heart_icon} />
          </div>

          <div className={styles.event_desc}>
            <div className={styles.event_date}>
              <h3>SEP</h3>
              <h3>18</h3>
            </div>

            <div className={styles.events_explain}>
              <h3>Karaoke Opening club</h3>
              <span>
                Lorem ipsum, in graphical and textual context, refers to filler
                text that is placed in a document or visual presentation. Lorem
                ipsum is derived from the Latin "dolorem ipsum" roughly
                translated as "pain itself."
              </span>
            </div>
          </div>
        </div>
        <div className={styles.event_item}>
          <div className={styles.event_image}>
            <Image
              src="/party.jpg"
              height={300}
              width={428}
              alt="no photo"
              className={styles.image}
            />
          </div>
          <div className={styles.info}>
            <span>$25</span>
            <FaHeart className={styles.heart_icon} />
          </div>

          <div className={styles.event_desc}>
            <div className={styles.event_date}>
              <h3>MARCH</h3>
              <h3>18</h3>
            </div>

            <div className={styles.events_explain}>
              <h3>Nairobi Karaoke</h3>
              <span>
                Lorem ipsum, in graphical and textual context, refers to filler
                text that is placed in a document or visual presentation. Lorem
                ipsum is derived from the Latin "dolorem ipsum" roughly
                translated as "pain itself."
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.load_more}>

        <Link href="/eventslist"><button>Load more</button></Link>

            
      </div>
    </div>
  );
};

export default MoreEvents;
