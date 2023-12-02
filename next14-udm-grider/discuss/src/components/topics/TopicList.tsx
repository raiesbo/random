import { db } from "@/db";
import paths from "@/paths";
import { Chip } from "@nextui-org/react";
import Link from "next/link";

export default async function TopicList() {
    const topics = await db.topic.findMany();

    return (
        <div className="flex flex-row gap-2 flex-wrap">
            {topics.map(topic => (
                <Link href={paths.topicShow(topic.slug)} key={topic.id}>
                    <Chip color="warning" variant="shadow">
                        {topic.slug}
                    </Chip>
                </Link>
            ))}
        </div>
    )
}