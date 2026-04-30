interface JsonLdProps {
  id?: string;
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** JSON-LD schema.org pour le SEO. `dangerouslySetInnerHTML` + échappement `</` requis pour un `<script>` valide dans React. */
export function JsonLd({ id, data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
