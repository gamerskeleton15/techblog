export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Disclaimer</h1>

        <div className="prose prose-lg mx-auto">
          <p>
            <em>Last updated: {new Date().toLocaleDateString()}</em>
          </p>

          <p>
            The information provided on TechBlog is for general informational
            purposes only. All content is provided in good faith; however, we make
            no representation or warranty of any kind, express or implied, regarding
            the accuracy, adequacy, validity, reliability, availability or
            completeness of any information on the website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            External Links Disclaimer
          </h2>
          <p>
            The website may contain (or you may be sent through the website) links
            to other websites or content belonging to or originating from third
            parties. Such external links are not investigated, monitored, or
            checked for accuracy, adequacy, validity, reliability, availability or
            completeness by us. We do not warrant, endorse, guarantee, or assume
            responsibility for the accuracy or reliability of any information
            offered by third-party websites linked through the website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Professional Disclaimer
          </h2>
          <p>
            The website cannot and does not contain professional advice. The
            information is provided for general informational and educational
            purposes only and is not a substitute for professional advice.
            Accordingly, before taking any actions based upon such information, we
            encourage you to consult with the appropriate professionals. We do not
            provide any kind of professional advice.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Errors and Omissions Disclaimer
          </h2>
          <p>
            While we have made every attempt to ensure that the information
            contained in this site has been obtained from reliable sources, TechBlog
            is not responsible for any errors or omissions, or for the results
            obtained from the use of this information.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Fair Use Disclaimer
          </h2>
          <p>
            This website may contain copyrighted material the use of which has not
            always been specifically authorized by the copyright owner. We believe
            this constitutes a {"“fair use”"} of any such copyrighted material for the
            purposes of news reporting, criticism, comment, teaching, scholarship,
            and research.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Views Expressed Disclaimer
          </h2>
          <p>
            The website may contain views and opinions which are those of the
            authors and do not necessarily reflect the official policy or position
            of any other author, agency, organization, employer or company,
            including TechBlog.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            No Responsibility Disclaimer
          </h2>
          <p>
            The information on the website is provided with the understanding that
            TechBlog is not herein engaged in rendering legal, accounting, tax, or
            other professional advice and services. As such, it should not be used
            as a substitute for consultation with professional accounting, tax,
            legal or other competent advisers.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            “Use at Your Own Risk” Disclaimer
          </h2>
          <p>
            All information in the website is provided “as is”, with no guarantee
            of completeness, accuracy, timeliness or of the results obtained from
            the use of this information, and without warranty of any kind, express
            or implied, including, but not limited to warranties of performance,
            merchantability and fitness for a particular purpose.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Contact Us
          </h2>
          <p>
            If you have any questions about this Disclaimer, please contact us at{' '}
            <a
              href="mailto:contact@techblog.example.com"
              className="text-blue-600 hover:underline"
            >
              contact@techblog.example.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}