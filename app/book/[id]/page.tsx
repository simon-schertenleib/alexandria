import { getBook } from '@/lib/bookSearch'
import { notFound } from 'next/navigation'
import BackButton from '@/components/BackButton'
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBook(Number(params.id))
  if (!book) return notFound()
  return (
    <div className="relative flex min-h-screen flex-col">
      <BackButton className="absolute left-4 top-4" />
      <Breadcrumb className="px-8 pt-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{book.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ScrollArea className="flex-1 p-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <Card className="md:w-1/3">
            <CardContent className="p-6 space-y-6">
              <div>
                <CardTitle className="flex items-center justify-between">
                  {book.title}
                  {book.year && (
                    <Badge variant="secondary" className="ml-2">
                      {book.year}
                    </Badge>
                  )}
                </CardTitle>
                {book.author && (
                  <CardDescription>{book.author}</CardDescription>
                )}
              </div>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src={`https://thumbs.dreamstime.com/b/flying-magic-books-library-367534733.jpg`}
                  alt="Book cover"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
              {book.description && (
                <p className="text-sm text-muted-foreground">
                  {book.description}
                </p>
              )}
              {book.rating && (
                <div className="space-y-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline">
                        Rating: {book.rating.toFixed(1)}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>Out of 5</TooltipContent>
                  </Tooltip>
                  <Progress value={(book.rating / 5) * 100} />
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="md:flex-1">
            <CardContent className="p-6">
              <Table>
                <TableBody>
                  {book.genre && (
                    <TableRow>
                      <TableHead>Genre</TableHead>
                      <TableCell>{book.genre}</TableCell>
                    </TableRow>
                  )}
                  {book.pages && (
                    <TableRow>
                      <TableHead>Pages</TableHead>
                      <TableCell>{book.pages}</TableCell>
                    </TableRow>
                  )}
                  {book.publisher && (
                    <TableRow>
                      <TableHead>Publisher</TableHead>
                      <TableCell>{book.publisher}</TableCell>
                    </TableRow>
                  )}
                  {book.language && (
                    <TableRow>
                      <TableHead>Language</TableHead>
                      <TableCell>{book.language}</TableCell>
                    </TableRow>
                  )}
                  {book.isbn && (
                    <TableRow>
                      <TableHead>ISBN</TableHead>
                      <TableCell>{book.isbn}</TableCell>
                    </TableRow>
                  )}
                  {book.year && (
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableCell>{book.year}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
