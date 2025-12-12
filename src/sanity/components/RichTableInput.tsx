import React, { useMemo } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Inline,
  Stack,
  Text,
} from "@sanity/ui";
import {
  PatchEvent,
  PortableTextInput,
  type ArraySchemaType,
  type ObjectInputProps,
  type Path,
  type PortableTextBlock,
  set,
  setIfMissing,
  unset,
} from "sanity";
import { uuid } from "@sanity/uuid";

type TableCell = {
  _type?: string;
  _key?: string;
  content?: PortableTextBlock[];
};

type TableRow = {
  _type?: string;
  _key?: string;
  cells?: TableCell[];
};

type TableValue = {
  _type?: string;
  rows?: TableRow[];
};

const CELL_TYPE_NAME = "tableCell";
const ROW_TYPE_NAME = "tableRow";

function createEmptyCell(): TableCell {
  return {
    _type: CELL_TYPE_NAME,
    _key: uuid(),
    content: [],
  };
}

function createRow(columnCount: number): TableRow {
  return {
    _type: ROW_TYPE_NAME,
    _key: uuid(),
    cells: Array.from({ length: columnCount }, createEmptyCell),
  };
}

export function RichTableInput(props: ObjectInputProps<TableValue>) {
  const { value, onChange, schemaType, readOnly, path } = props;
  const rows: TableRow[] = value?.rows || [];
  const columnCount = rows[0]?.cells?.length || 0;
  const tableKey = value?._key || uuid();

  const contentType = useMemo(() => {
    const rowsField = schemaType.fields.find((f) => f.name === "rows");
    const rowType = (rowsField?.type as any)?.of?.[0];
    const cellsField = rowType?.fields?.find((f: any) => f.name === "cells");
    const cellType = cellsField?.type?.of?.[0];
    const contentField = cellType?.fields?.find((f: any) => f.name === "content");
    return contentField?.type as ArraySchemaType<PortableTextBlock>;
  }, [schemaType]);

  const ensureTableExists = () => {
    if (value?._type === schemaType.name && value.rows?.length) return;
    const next: TableValue = {
      _type: schemaType.name,
      _key: tableKey,
      rows: [createRow(2), createRow(2)],
    };
    onChange(set(next));
  };

  const addRow = () => {
    if (readOnly) return;
    const cols = columnCount || 2;
    const nextRows = [...rows, createRow(cols)];
    onChange(
      set({
        _type: schemaType.name,
        _key: tableKey,
        rows: nextRows,
      })
    );
  };

  const addColumn = () => {
    if (readOnly) return;
    const cols = columnCount || 1;
    const nextRows = (rows.length ? rows : [createRow(1)]).map((row) => ({
      ...row,
      cells: [...(row.cells || []), createEmptyCell()],
    }));
    onChange(
      set({
        _type: schemaType.name,
        _key: tableKey,
        rows: nextRows,
      })
    );
  };

  const removeRow = (rowIndex: number) => {
    if (readOnly) return;
    const nextRows = rows.filter((_, idx) => idx !== rowIndex);
    if (nextRows.length === 0) {
      onChange(unset());
      return;
    }
    onChange(
      set({
        _type: schemaType.name,
        _key: tableKey,
        rows: nextRows,
      })
    );
  };

  const removeColumn = (colIndex: number) => {
    if (readOnly || columnCount <= 1) return;
    const nextRows = rows.map((row) => ({
      ...row,
      cells: (row.cells || []).filter((_, idx) => idx !== colIndex),
    }));
    onChange(
      set({
        _type: schemaType.name,
        _key: tableKey,
        rows: nextRows,
      })
    );
  };

  const handleCellChange =
    (rowIndex: number, cellIndex: number) => (patchEvent: PatchEvent) => {
      const rowKey = rows[rowIndex]?._key || uuid();
      const cellKey = rows[rowIndex]?.cells?.[cellIndex]?._key || uuid();

      const basePatches: PatchEvent = PatchEvent.from([
        setIfMissing({ _type: schemaType.name, rows: [] }),
        setIfMissing(
          { _type: ROW_TYPE_NAME, _key: rowKey, cells: [] },
          ["rows", rowIndex] as Path
        ),
        setIfMissing(
          { _type: CELL_TYPE_NAME, _key: cellKey, content: [] },
          ["rows", rowIndex, "cells", cellIndex] as Path
        ),
      ]);

      const targeted = patchEvent.prefixAll([
        "rows",
        rowIndex,
        "cells",
        cellIndex,
        "content",
      ]);

      onChange(basePatches.append(targeted));
    };

  const handleReset = () => {
    if (readOnly) return;
    onChange(unset());
  };

  return (
    <Stack space={3}>
      <Flex gap={2} align="center" justify="space-between">
        <Text weight="semibold">Table</Text>
        <Inline space={2}>
          <Button
            mode="ghost"
            text="Add row"
            disabled={readOnly}
            onClick={addRow}
            tone="primary"
            size={2}
          />
          <Button
            mode="ghost"
            text="Add column"
            disabled={readOnly}
            onClick={addColumn}
            tone="primary"
            size={2}
          />
          <Button
            mode="bleed"
            text="Reset"
            disabled={readOnly}
            tone="critical"
            onClick={handleReset}
            size={2}
          />
        </Inline>
      </Flex>

      {!value && (
        <Card padding={4} tone="transparent" border>
          <Stack space={3}>
            <Text muted>
              Add a table to start editing cells with the same rich text tools as the body.
            </Text>
            <Button text="Create table" tone="primary" onClick={ensureTableExists} />
          </Stack>
        </Card>
      )}

      {value && (
        <Stack space={3}>
          <Box>
            <Grid columns={columnCount || 1} gap={3}>
              {rows.map((row, rowIndex) =>
                (row.cells || []).map((cell, cellIndex) => (
                  <Card
                    key={`${row._key || rowIndex}-${cell._key || cellIndex}`}
                    padding={2}
                    shadow={1}
                    radius={2}
                    tone="transparent"
                    style={{ minHeight: "120px" }}
                  >
                    {contentType ? (
                      <PortableTextInput
                        {...{
                          // core required props
                          value: cell?.content || [],
                          onChange: handleCellChange(rowIndex, cellIndex),
                          schemaType: contentType,
                          path: [
                            ...path,
                            "rows",
                            rowIndex,
                            "cells",
                            cellIndex,
                            "content",
                          ],
                          // pass through shared renderers from parent context where available
                          renderDefault: props.renderDefault,
                          renderAnnotation: props.renderAnnotation,
                          renderBlock: props.renderBlock,
                          renderInlineBlock: props.renderInlineBlock,
                          renderField: props.renderField,
                          renderInput: props.renderInput,
                          renderItem: props.renderItem,
                          renderPreview: props.renderPreview,
                          // array item helpers (no-ops; Portable Text handles changes via onChange)
                          onItemAppend: () => {},
                          onItemPrepend: () => {},
                          onItemRemove: () => {},
                          onItemMove: () => {},
                          onInsert: () => {},
                          onItemCollapse: () => {},
                          onItemExpand: () => {},
                          onItemOpen: () => {},
                          onItemClose: () => {},
                          // focus helpers
                          onPathFocus: props.onPathFocus,
                          onPathBlur: props.onPathBlur,
                          // uploader/initial value fallbacks
                          resolveInitialValue:
                            props.resolveInitialValue ||
                            (async () => ({
                              _type: "block",
                              _key: uuid(),
                              style: "normal",
                              children: [],
                              markDefs: [],
                            })),
                          resolveUploader:
                            props.resolveUploader || (() => undefined),
                          onUpload: props.onUpload || (() => {}),
                          // shape expectations
                          members: [],
                          elementProps: {
                            id: `${props.id || "table"}-cell-${rowIndex}-${cellIndex}`,
                            ref: null,
                            onBlur: () => {},
                            onFocus: () => {},
                          },
                          readOnly,
                          changed: props.changed,
                          focused: false,
                          level: (props.level || 0) + 1,
                          presence: [],
                          validation: [],
                          id: `${props.id || "table"}-cell-${rowIndex}-${cellIndex}`,
                          groups: props.groups || [],
                        }}
                      />
                    ) : (
                      <Text muted>Missing cell schema</Text>
                    )}
                  </Card>
                ))
              )}
            </Grid>
          </Box>

          <Flex gap={2} justify="flex-end" wrap="wrap">
            {rows.map((_, idx) => (
              <Button
                key={`remove-row-${idx}`}
                text={`Remove row ${idx + 1}`}
                tone="critical"
                mode="bleed"
                disabled={readOnly}
                onClick={() => removeRow(idx)}
              />
            ))}
            {Array.from({ length: columnCount || 0 }).map((_, idx) => (
              <Button
                key={`remove-col-${idx}`}
                text={`Remove col ${idx + 1}`}
                tone="critical"
                mode="bleed"
                disabled={readOnly || columnCount <= 1}
                onClick={() => removeColumn(idx)}
              />
            ))}
          </Flex>
        </Stack>
      )}
    </Stack>
  );
}
