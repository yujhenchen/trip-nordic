import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilterChip, FilterRow } from "@/pages/explore/Filter";

interface Props {
  onClose: () => void;
  headerImage: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  tags: Array<string>;
}

export default function DetailsDialog({
  onClose,
  headerImage,
  title,
  description,
  tags,
}: Props) {
  return (
    <Dialog open onOpenChange={onClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="p-10 overflow-scroll w-full md:w-2/3 xl:w-2/5 max-w-full max-h-screen">
        <img
          src={headerImage.src}
          alt={headerImage.alt}
          className="w-3/5 object-cover mx-auto"
        />
        <div className="flex flex-col md:flex-row space-x-6">
          <DialogHeader className="py-4">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="flex space-y-4 flex-col">
            {tags.length > 0 ? (
              <FilterRow className="place-content-end">
                {tags.map((tag) => (
                  <FilterChip
                    key={tag}
                    selected={false}
                    value={tag}
                    selectedIcon={null}
                  ></FilterChip>
                ))}
              </FilterRow>
            ) : null}
            <iframe
              className="w-200 h-100"
              src="https://www.openstreetmap.org/export/embed.html?bbox=9.950866699218752%2C59.716945112398264%2C11.145629882812502%2C60.22685703775105&amp;layer=mapnik"
            ></iframe>
            {/* <br />
            <small>
              <a href="https://www.openstreetmap.org/?#map=10/59.9729/10.5482">
                View Larger Map
              </a>
            </small> */}
          </div>
        </div>
        <Button
          variant="default"
          size="lg"
          className="rounded-xl w-fit mx-auto"
        >
          Keep
        </Button>
      </DialogContent>
    </Dialog>
  );
}
