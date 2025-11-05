"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, Trash2, Edit2, Save, X, FileText, Send, Loader2,
  Calendar, DollarSign, Mail
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"

interface Invoice {
  id?: string
  invoice_number: string
  project_id?: string
  user_id: string
  client_email: string
  client_name?: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  subtotal: number
  tax_rate: number
  tax_amount: number
  discount_amount: number
  total_amount: number
  currency: string
  due_date?: string
  issued_date?: string
  notes?: string
  line_items?: any[]
}

export default function InvoicesPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    if (authLoading) return
    
    if (!user || user.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You must be an admin to access this page.",
        variant: "destructive",
      })
      router.push("/user/dashboard")
      return
    }
    
    fetchData()
  }, [user, authLoading, router, toast])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [invoicesResult, usersResult] = await Promise.all([
        supabase.from('invoices').select('*').order('created_at', { ascending: false }),
        supabase.from('users').select('id, email, full_name').order('full_name')
      ])

      if (invoicesResult.error) throw invoicesResult.error
      if (usersResult.error) throw usersResult.error

      setInvoices(invoicesResult.data || [])
      setUsers(usersResult.data || [])
    } catch (error: any) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to load invoices.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateInvoiceNumber = async () => {
    try {
      const { data, error } = await supabase.rpc('generate_invoice_number')
      if (error) throw error
      return data || `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`
    } catch (error) {
      // Fallback if function doesn't exist
      const year = new Date().getFullYear()
      const timestamp = Date.now().toString().slice(-4)
      return `INV-${year}-${timestamp}`
    }
  }

  // Calculate invoice totals
  const calculateInvoiceTotals = (invoice: Invoice) => {
    const subtotal = invoice.line_items?.reduce((sum: number, item: any) => 
      sum + parseFloat(item.amount || item.price || 0), 0) || 0
    const taxAmount = subtotal * ((invoice.tax_rate || 0) / 100)
    const discount = invoice.discount_amount || 0
    const total = subtotal + taxAmount - discount
    
    return { subtotal, taxAmount, discount, total }
  }

  const handleSaveInvoice = async () => {
    if (!editingInvoice) return

    try {
      let invoiceNumber = editingInvoice.invoice_number
      
      if (!invoiceNumber) {
        invoiceNumber = await generateInvoiceNumber()
      }

      const totals = calculateInvoiceTotals(editingInvoice)

      const invoiceData = {
        ...editingInvoice,
        invoice_number: invoiceNumber,
        created_by: user?.id,
        issued_date: editingInvoice.issued_date || new Date().toISOString().split('T')[0],
        subtotal: totals.subtotal,
        tax_amount: totals.taxAmount,
        total_amount: totals.total,
      }

      if (editingInvoice.id) {
        const { error } = await supabase
          .from('invoices')
          .update(invoiceData)
          .eq('id', editingInvoice.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('invoices')
          .insert([invoiceData])

        if (error) throw error
      }

      toast({
        title: "Success",
        description: "Invoice saved successfully.",
      })
      setEditingInvoice(null)
      fetchData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save invoice.",
        variant: "destructive",
      })
    }
  }

  const handleSendInvoice = async (invoice: Invoice) => {
    try {
      // In a real app, you'd send an email here
      // For now, we'll just update the status
      const { error } = await supabase
        .from('invoices')
        .update({ status: 'sent' })
        .eq('id', invoice.id)

      if (error) throw error

      toast({
        title: "Invoice Sent",
        description: `Invoice sent to ${invoice.client_email}`,
      })

      // Generate shareable link
      const invoiceUrl = `${window.location.origin}/invoice/${invoice.id}`
      
      toast({
        title: "Invoice Link",
        description: `Share this link with client: ${invoiceUrl}`,
      })

      fetchData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send invoice.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteInvoice = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return

    try {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Invoice deleted successfully.",
      })
      fetchData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete invoice.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      paid: "bg-green-600",
      sent: "bg-blue-600",
      overdue: "bg-red-600",
      draft: "bg-gray-600",
      cancelled: "bg-gray-600",
    }
    return <Badge className={colors[status] || "bg-gray-600"}>{status.toUpperCase()}</Badge>
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Invoice Management</h1>
        <p className="text-gray-400">Create and manage client invoices</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Invoices</h2>
        <Button onClick={() => {
          setEditingInvoice({
            invoice_number: '',
            user_id: '',
            client_email: '',
            status: 'draft',
            subtotal: 0,
            tax_rate: 0,
            tax_amount: 0,
            discount_amount: 0,
            total_amount: 0,
            currency: 'USD',
            line_items: [],
          })
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      {editingInvoice && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Edit Invoice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Client</Label>
                <Select
                  value={editingInvoice.user_id}
                  onValueChange={(value) => {
                    const selectedUser = users.find(u => u.id === value)
                    setEditingInvoice({
                      ...editingInvoice,
                      user_id: value,
                      client_email: selectedUser?.email || '',
                      client_name: selectedUser?.full_name || '',
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.full_name || u.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Client Email</Label>
                <Input
                  value={editingInvoice.client_email}
                  onChange={(e) => setEditingInvoice({...editingInvoice, client_email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label>Client Name</Label>
              <Input
                value={editingInvoice.client_name || ''}
                onChange={(e) => setEditingInvoice({...editingInvoice, client_name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={editingInvoice.due_date || ''}
                  onChange={(e) => setEditingInvoice({...editingInvoice, due_date: e.target.value})}
                />
              </div>
              <div>
                <Label>Tax Rate (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editingInvoice.tax_rate}
                  onChange={(e) => setEditingInvoice({...editingInvoice, tax_rate: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
            <div>
              <Label>Discount Amount</Label>
              <Input
                type="number"
                step="0.01"
                value={editingInvoice.discount_amount}
                onChange={(e) => setEditingInvoice({...editingInvoice, discount_amount: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Line Items</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentItems = editingInvoice.line_items || []
                    const newItem = { name: "", description: "", amount: 0 }
                    setEditingInvoice({
                      ...editingInvoice,
                      line_items: [...currentItems, newItem]
                    })
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>
              
              <div className="space-y-3">
                {editingInvoice.line_items?.map((item: any, index: number) => (
                  <Card key={index} className="bg-gray-800 border-gray-700">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Item name (e.g., Web Development)"
                            value={item.name || ''}
                            onChange={(e) => {
                              const items = [...(editingInvoice.line_items || [])]
                              items[index] = { ...items[index], name: e.target.value }
                              setEditingInvoice({...editingInvoice, line_items: items})
                            }}
                            className="mb-2"
                          />
                          <Textarea
                            placeholder="Description"
                            value={item.description || ''}
                            onChange={(e) => {
                              const items = [...(editingInvoice.line_items || [])]
                              items[index] = { ...items[index], description: e.target.value }
                              setEditingInvoice({...editingInvoice, line_items: items})
                            }}
                            className="mb-2"
                            rows={2}
                          />
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              value={item.amount || ''}
                              onChange={(e) => {
                                const items = [...(editingInvoice.line_items || [])]
                                items[index] = { ...items[index], amount: parseFloat(e.target.value) || 0 }
                                setEditingInvoice({...editingInvoice, line_items: items})
                              }}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const items = editingInvoice.line_items?.filter((_, i) => i !== index) || []
                            setEditingInvoice({...editingInvoice, line_items: items})
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {(!editingInvoice.line_items || editingInvoice.line_items.length === 0) && (
                  <div className="text-center py-8 text-gray-400 border border-dashed border-gray-700 rounded-lg">
                    <p>No line items yet. Click "Add Item" to get started.</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea
                value={editingInvoice.notes || ''}
                onChange={(e) => setEditingInvoice({...editingInvoice, notes: e.target.value})}
              />
            </div>
            
            {/* Invoice Totals Preview */}
            {editingInvoice && (() => {
              const totals = calculateInvoiceTotals(editingInvoice)
              return (
                <Card className="bg-blue-900/20 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Invoice Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal:</span>
                      <span className="text-white">${totals.subtotal.toFixed(2)}</span>
                    </div>
                    {editingInvoice.tax_rate > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tax ({editingInvoice.tax_rate}%):</span>
                        <span className="text-white">${totals.taxAmount.toFixed(2)}</span>
                      </div>
                    )}
                    {editingInvoice.discount_amount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Discount:</span>
                        <span className="text-green-400">-${totals.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-700">
                      <span className="text-white font-semibold">Total:</span>
                      <span className="text-white font-bold text-xl">${totals.total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })()}
            
            <div className="flex gap-2">
              <Button onClick={handleSaveInvoice}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" onClick={() => {
                setEditingInvoice(null)
              }}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {invoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">{invoice.invoice_number}</h3>
                    {getStatusBadge(invoice.status)}
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <div>Client: {invoice.client_name || invoice.client_email}</div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {invoice.total_amount.toFixed(2)} {invoice.currency}
                      </span>
                      {invoice.due_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {format(new Date(invoice.due_date), 'MMM dd, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {invoice.status === 'draft' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendInvoice(invoice)}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const url = `${window.location.origin}/invoice/${invoice.id}`
                      navigator.clipboard.writeText(url)
                      toast({
                        title: "Link Copied",
                        description: "Invoice link copied to clipboard",
                      })
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingInvoice(invoice)
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteInvoice(invoice.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

