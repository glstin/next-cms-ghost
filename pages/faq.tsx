import Link from 'next/link'
import { GetStaticProps } from 'next'

import { Layout } from '@components/Layout'
import { HeaderPage } from '@components/HeaderPage'
import { PostCard } from '@components/PostCard'

import { getAllPosts, getAllSettings, GhostSettings, GhostPostsOrPages } from '@lib/ghost'
import { useLang, get } from '@utils/use-lang'
import { BodyClass } from '@helpers/BodyClass'

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts({ limit: 3 })
  const settings = await getAllSettings()

  return {
    props: {
      settings,
      posts,
      bodyClass: BodyClass({})
    },
  }
}

interface Custom404Props {
  posts: GhostPostsOrPages
  settings: GhostSettings
  bodyClass: string
}

export default function Custom404({ posts, settings, bodyClass }: Custom404Props) {
  const text = get(useLang())

  return (
    <Layout {...{ settings, bodyClass }} header={<HeaderPage {...{ settings }} />} errorClass="error-content">
      <div className="inner">
        <section className="faq">
          <h1 className="faq">FAQ</h1>
                  <h2>HOW DO I SUBMIT?</h2>
                  <p>Submissions are ONLY accepted via our submission system using your KRISPYVIBES account.
                      Submissions are typically reviewed within 72 hours, however it can take up to 7 business days (some of us sleep occasionally), so please be patient. Once your submission has been reviewed, you will be notified via email whether it has been approved or denied. You can also check the status of your submissions in your account dashboard under ‘my submissions’. Accepted submissions are typically published within 72 hours after acceptance but may take up to 7 days (again, the sleep thing, please be patient) and you’ll be notified via email when it has been published. If we really like your submission we may reach out to you about other opportunities,
                      like YouTube uploads or posts on our social media, even interviews and collaborations.</p>
                  <h2>HOW DO I SUBMIT TO KRISPYVIBES’S YOUTUBE CHANNEL?</h2>
                  <p>If you submit, you just did. Every submission is considered for YouTube uploads.
                      If we think your submission has potential, we will reach out to you.</p>
          {/* <Link href="/" ><a className="error-link">{text(`GOTO_FRONT_PAGE`)} →</a></Link> */}
        </section>

        <div className="post-feed">
          {posts.map((post, i) => (
            <PostCard key={post.id} {...{ settings, post, num: i }} />
          ))}
        </div>

      </div>
    </Layout>
  )
}
