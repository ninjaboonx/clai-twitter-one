import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create New Content - CLAI',
  description: 'AI-powered content creation for X',
}

export default function NewContentPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Create New Content
          </h3>
          <div className="mt-5">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="content-type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content Type
                </label>
                <select
                  id="content-type"
                  name="content-type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option>Single Tweet</option>
                  <option>Thread</option>
                  <option>Article</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-gray-700"
                >
                  Topic
                </label>
                <input
                  type="text"
                  name="topic"
                  id="topic"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="What would you like to write about?"
                />
              </div>

              <div>
                <label
                  htmlFor="tone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tone
                </label>
                <select
                  id="tone"
                  name="tone"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Humorous</option>
                  <option>Informative</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <div className="mt-1">
                  <textarea
                    id="content"
                    name="content"
                    rows={4}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Start typing or let AI help you generate content..."
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Character count: <span id="char-count">0</span>/280
                </p>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Generate with AI
                </button>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Post Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            AI Suggestions
          </h3>
          <div className="mt-5 space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">
                "Here's a professional take on your topic that emphasizes key points
                and maintains engagement..."
              </p>
              <button
                type="button"
                className="mt-2 text-sm text-primary-600 hover:text-primary-500"
              >
                Use this suggestion
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">
                "A more casual approach that could resonate better with your
                audience..."
              </p>
              <button
                type="button"
                className="mt-2 text-sm text-primary-600 hover:text-primary-500"
              >
                Use this suggestion
              </button>
            </div>
          </div>
        </div>
 