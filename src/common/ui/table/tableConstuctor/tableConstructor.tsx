import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

export const Table = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = {
      table: clsx(s.root, className),
    }

    return <table {...rest} className={classNames.table} ref={ref} />
  }
)

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = {
      tableHead: clsx(s.tableHead, className),
    }

    return <thead className={classNames.tableHead} ref={ref} {...rest} />
  }
)

export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = {
      tableRow: clsx(s.tableRow, className),
    }

    return <tr className={classNames.tableRow} {...rest} ref={ref} />
  }
)

export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = {
      tableHeadCell: clsx(s.tableHeadCell, className),
    }

    return <th ref={ref} {...rest} className={classNames.tableHeadCell} />
  }
)

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = {
      tableBody: clsx(s.tableBody, className),
    }

    return <tbody ref={ref} {...rest} className={classNames.tableBody} />
  }
)

export const TableDataCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = {
      tableBody: clsx(s.tableDataCell, className),
    }

    return <td ref={ref} {...rest} className={classNames.tableBody} />
  }
)
