import {Box, Heading, Text} from '@primer/components'
import React from 'react'
import Head from './head'
import Header, {HEADER_HEIGHT} from './header'
import PageFooter from './page-footer'
import Sidebar from './sidebar'
import SourceLink from './source-link'
import StatusLabel from './status-label'
import StorybookLink from './storybook-link'
import TableOfContents from './table-of-contents'

function Layout({children, frontmatter, tableOfContents, pageContext}) {
  let {
    title,
    description,
    status,
    source,
    storybook,
    additionalContributors,
  } = frontmatter

  if (!additionalContributors) {
    additionalContributors = []
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Head title={title} description={description} />
      <Header />
      <Box display="flex" flex="1 1 auto" flexDirection="row" css={{zIndex: 0}}>
        <Box display={['none', null, null, 'block']}>
          <Sidebar />
        </Box>
        <Box
          id="skip-nav"
          display="flex"
          width="100%"
          p={[4, 5, 6, 7]}
          sx={{
            justifyContent: 'center',
            flexDirection: 'row-reverse',
          }}
        >
          {tableOfContents.items ? (
            <Box
              sx={{width: 220, flex: '0 0 auto', marginLeft: 6}}
              display={['none', null, 'block']}
              css={{gridArea: 'table-of-contents', overflow: 'auto'}}
              position="sticky"
              top={HEADER_HEIGHT + 24}
              maxHeight={`calc(100vh - ${HEADER_HEIGHT}px - 24px)`}
            >
              <Text display="inline-block" fontWeight="bold" mb={1}>
                On this page
              </Text>
              <TableOfContents items={tableOfContents.items} />
            </Box>
          ) : null}
          <Box width="100%" maxWidth="960px">
            <Box mb={4}>
              <Box display="flex" sx={{alignItems: 'center'}}>
                <Heading as="h1" mr={2}>
                  {title}
                </Heading>{' '}
                {status ? <StatusLabel status={status} /> : null}
              </Box>
              {description ? (
                <Box pb={2} sx={{fontSize: 3}}>
                  {description}
                </Box>
              ) : null}
            </Box>
            {tableOfContents.items ? (
              <Box
                borderWidth="1px"
                borderStyle="solid"
                borderColor="border.primary"
                borderRadius={2}
                display={['block', null, 'none']}
                mb={5}
                bg="auto.gray.1"
              >
                <Box p={3}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text fontWeight="bold">On this page</Text>
                  </Box>
                </Box>
                <Box
                  p={3}
                  sx={{
                    borderTop: '1px solid',
                    borderColor: 'border.gray',
                  }}
                >
                  <TableOfContents items={tableOfContents.items} />
                </Box>
              </Box>
            ) : null}
            {children}
            <PageFooter
              editUrl={pageContext.editUrl}
              contributors={pageContext.contributors.concat(
                additionalContributors.map(login => ({login})),
              )}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
