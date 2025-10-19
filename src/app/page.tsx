'use client';

import useAppStore from '@/lib/store';

export default function Home() {
  const { selectedTool } = useAppStore();

  if (!selectedTool) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome to Dev Toys</h2>
        <p className="text-muted-foreground mb-8">
          Select a tool from the sidebar to get started.
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Calculator</h3>
            <p className="text-sm text-muted-foreground">Perform calculations</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Color Picker</h3>
            <p className="text-sm text-muted-foreground">Pick and convert colors</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Encoder/Decoder</h3>
            <p className="text-sm text-muted-foreground">Encode and decode data</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Formatter</h3>
            <p className="text-sm text-muted-foreground">Format text and code</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        {selectedTool.replace('-', ' ')}
      </h2>
      <p className="text-muted-foreground">
        Tool component will be implemented here.
      </p>
    </div>
  );
}
