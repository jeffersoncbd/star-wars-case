export class ExtractResourceFromSWApiURLs {
  extract(url: string) {
    const urlParts = url.split('/')
    return urlParts[urlParts.length - 3]
  }
}
