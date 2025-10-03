import { Card, CardContent } from "../../components/ui/card";

export default function UserCard({ avatar, name, description, id }) {
  return (
    <Card className="w-full   border border-gray-100 rounded-lg shadow-sm my-6 py-4  ">
      <CardContent className="flex  gap-3 space-y-3 justify-center items-center">
        {/* Avatar */}
        <img
          src={avatar}
          alt={name}
          className="w-30 h-30 mr-3 rounded-md object-cover"
        />

        <div className="flex-1 flex flex-col gap-2 ">
          <h3 className="text-lg font-semibold">{name}</h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
          <a
            href={`/creator/${id}`}
            className="text-sm text-orange-500  font-medium "
          >
            View Profile
          </a>
        </div>

        {/* Name */}
      </CardContent>
    </Card>
  );
}
