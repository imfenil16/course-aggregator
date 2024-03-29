import AdminCourseAdd from '../../components/adminCourseAdd';
import Button from '../../components/button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function EditCourse({ courses, api_url }) {
  const router = useRouter();
  // console.log(router.query.slug);
  return courses.map((course) => {
    // console.log(course.slug);
    const [titleState, setTitleState] = useState(course.title);
    const [authorState, setAuthorState] = useState(course.author);
    const [priceState, setPriceState] = useState(course.price);
    const [technologyState, setTechnologyState] = useState(course.technology);
    const [descriptionState, setDescriptionState] = useState(
      course.description
    );
    const [urlState, setUrlState] = useState(course.url);
    const [ratingState, setRatingState] = useState(course.rating);
    const handleSubmit = async (e) => {
      axios
        .put(`${api_url}/courses/${router.query.slug}`, {
          title: titleState,
          author: authorState,
          price: priceState,
          technology: technologyState,
          description: descriptionState,
          url: urlState,
          rating: ratingState,
        })
        .then((res) => {
          console.log(res);
          router.push('/courseDashboard');
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (course.slug === router.query.slug) {
      return (
        <main id='main'>
          <div className='flex mt-32 flex-col justify-center w-3/6 m-auto'>
            <Link
              href='../courseDashboard'
              target='_blank'
              rel='noopener noreferrer'
            >
              <a className='hover:underline hover:text-blue-600 w-fit'>
                {' '}
                &lsaquo; Back
              </a>
            </Link>
            <h1>Edit Course</h1>
            <AdminCourseAdd
              name='Title'
              placeHolder='Title of the course'
              value={titleState}
              setValue={setTitleState}
              tooltiptext='The title of the Web3 course.'
            />
            <AdminCourseAdd
              name='Author'
              placeHolder='Author of the course'
              value={authorState}
              setValue={setAuthorState}
              tooltiptext='The person or business that published the Web3 course.'
            />
            <AdminCourseAdd
              name='Price'
              placeHolder='Price for the course'
              value={priceState}
              setValue={setPriceState}
              tooltiptext='The price of the course. If free, input 0.'
            />
            <AdminCourseAdd
              name='Technology'
              placeHolder='Technologies this course covers'
              value={technologyState}
              setValue={setTechnologyState}
              tooltiptext='Three to five technologies this course covers.'
            />
            <AdminCourseAdd
              name='Description'
              placeHolder='Description about the course'
              value={descriptionState}
              setValue={setDescriptionState}
              tooltiptext='The description of the course.'
            />
            <AdminCourseAdd
              name='URL'
              placeHolder='URL of the source'
              value={urlState}
              setValue={setUrlState}
              tooltiptext='The full URL linking back to the course page.'
            />
            <AdminCourseAdd
              name='Rating'
              placeHolder='Rating for this course'
              value={ratingState}
              setValue={setRatingState}
              tooltiptext='The rating for the course out of 5.'
            />
            <div className='mt-5'>
              <Button type='submit' onClick={handleSubmit}>
                Add New Course
              </Button>
            </div>
          </div>
        </main>
      );
    }
  });
}

export async function getStaticProps() {
  const api_url = 'https://web3-courses.herokuapp.com/api';
  const res = await fetch(`${api_url}/courses`);
  const courses = await res.json();
  return {
    props: {
      courses,
      api_url,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`https://web3-courses.herokuapp.com/api/courses`);
  const courses = await res.json();
  return {
    paths: courses.map((course) => ({
      params: {
        slug: course.slug,
      },
    })),
    fallback: false,
  };
}
