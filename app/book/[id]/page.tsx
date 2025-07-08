import { getBook } from '@/lib/bookSearch'
import { notFound } from 'next/navigation'
import BackButton from '@/components/BackButton'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
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
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {book.title}
              {book.year && (
                <Badge variant="secondary" className="ml-2">
                  {book.year}
                </Badge>
              )}
            </CardTitle>
            {book.author && <CardDescription>{book.author}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-6">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src={`https://thumbs.dreamstime.com/b/flying-magic-books-library-367534733.jpg`}
                alt="Book cover"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <Separator className="my-4" />
              <TabsContent value="summary" className="space-y-4">
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
              </TabsContent>
              <TabsContent value="details">
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  )
}
