import { Card } from "@/components/ui/card";
import { FileText, CheckCircle } from "lucide-react";

export function CSVUploadInfo() {
  return (
    <Card className="p-4 mt-4">
      <h4 className="font-medium mb-2 flex items-center gap-2">
        <FileText className="h-4 w-4" />
        CSV File Requirements
      </h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          First column should contain review texts
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          Maximum file size: 10MB
        </li>
      </ul>
    </Card>
  );
}