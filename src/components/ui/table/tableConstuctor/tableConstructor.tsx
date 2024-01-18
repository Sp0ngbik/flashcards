import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import s from './table.module.scss'

export const Table = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  (props, ref) => {
    const { className, ...rest } = props

    return <table {...rest} className={`${className} ${s.root}`} ref={ref} />
  }
)

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  (props, ref) => {
    const { className, ...rest } = props

    return <thead className={`${s.tableHead} ${className}`} ref={ref} {...rest} />
  }
)

export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  (props, ref) => {
    const { className, ...rest } = props

    return <tr className={`${className}, ${s.tableRow}`} {...rest} ref={ref} />
  }
)

export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  (props, ref) => {
    const { className, ...rest } = props

    return <th ref={ref} {...rest} className={`${className}, ${s.tableHeadCell}`} />
  }
)

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  (props, ref) => {
    const { className, ...rest } = props

    return <tbody ref={ref} {...rest} className={`${className}, ${s.tableBody}`} />
  }
)

export const TableDataCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  (props, ref) => {
    const { className, ...rest } = props

    return <td ref={ref} {...rest} className={`${className}, ${s.tableDataCell}`} />
  }
)
