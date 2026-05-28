/**
 * Inline JSON-LD emitter. Renders schema.org structured data as a
 * `<script type="application/ld+json">` block — usable in both server and
 * client components.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
