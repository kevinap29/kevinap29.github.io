export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      kab_kota: {
        Row: {
          id: number
          nama: string
          provinsi_id: number
        }
        Insert: {
          id: number
          nama: string
          provinsi_id: number
        }
        Update: {
          id?: number
          nama?: string
          provinsi_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "kab_kota_provinsi_id_fkey"
            columns: ["provinsi_id"]
            isOneToOne: false
            referencedRelation: "provinsi"
            referencedColumns: ["id"]
          },
        ]
      }
      kartu_keluarga: {
        Row: {
          created_at: string
          id: number
          is_deleted: boolean | null
          kecamatan_id: number
          kodepos: string | null
          last_accesed_at: string | null
          lat: string | null
          long: string | null
          no_kk: string
          no_kk_unique_id: string
          tanggal_buat_kk: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_deleted?: boolean | null
          kecamatan_id: number
          kodepos?: string | null
          last_accesed_at?: string | null
          lat?: string | null
          long?: string | null
          no_kk: string
          no_kk_unique_id: string
          tanggal_buat_kk: string
        }
        Update: {
          created_at?: string
          id?: number
          is_deleted?: boolean | null
          kecamatan_id?: number
          kodepos?: string | null
          last_accesed_at?: string | null
          lat?: string | null
          long?: string | null
          no_kk?: string
          no_kk_unique_id?: string
          tanggal_buat_kk?: string
        }
        Relationships: [
          {
            foreignKeyName: "kartu_keluarga_kecamatan_id_fkey"
            columns: ["kecamatan_id"]
            isOneToOne: false
            referencedRelation: "kecamatan"
            referencedColumns: ["id"]
          },
        ]
      }
      kecamatan: {
        Row: {
          id: number
          kab_kota_id: number
          nama: string
        }
        Insert: {
          id: number
          kab_kota_id: number
          nama: string
        }
        Update: {
          id?: number
          kab_kota_id?: number
          nama?: string
        }
        Relationships: [
          {
            foreignKeyName: "kecamatan_kab_kota_id_fkey"
            columns: ["kab_kota_id"]
            isOneToOne: false
            referencedRelation: "kab_kota"
            referencedColumns: ["id"]
          },
        ]
      }
      kecamatan_longlat: {
        Row: {
          created_at: string
          id: number
          kecamatan_id: number
          lat: string
          long: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          kecamatan_id: number
          lat: string
          long: string
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          kecamatan_id?: number
          lat?: string
          long?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "kecamatan_longlat_kecamatan_id_fkey"
            columns: ["kecamatan_id"]
            isOneToOne: false
            referencedRelation: "kecamatan"
            referencedColumns: ["id"]
          },
        ]
      }
      kodepos: {
        Row: {
          id: number
          kecamatan_id: number
          kodepos: string
        }
        Insert: {
          id?: number
          kecamatan_id: number
          kodepos: string
        }
        Update: {
          id?: number
          kecamatan_id?: number
          kodepos?: string
        }
        Relationships: [
          {
            foreignKeyName: "kodepos_kecamatan_id_fkey"
            columns: ["kecamatan_id"]
            isOneToOne: false
            referencedRelation: "kecamatan"
            referencedColumns: ["id"]
          },
        ]
      }
      nik: {
        Row: {
          created_at: string
          id: number
          is_deleted: boolean | null
          jenis_kelamin: Database["public"]["Enums"]["jenis_kelamin"]
          kecamatan_id: number
          kodepos: string | null
          last_accesed_at: string | null
          lat: string | null
          long: string | null
          nik: string
          nik_unique_id: string
          tanggal_lahir: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_deleted?: boolean | null
          jenis_kelamin: Database["public"]["Enums"]["jenis_kelamin"]
          kecamatan_id: number
          kodepos?: string | null
          last_accesed_at?: string | null
          lat?: string | null
          long?: string | null
          nik: string
          nik_unique_id: string
          tanggal_lahir: string
        }
        Update: {
          created_at?: string
          id?: number
          is_deleted?: boolean | null
          jenis_kelamin?: Database["public"]["Enums"]["jenis_kelamin"]
          kecamatan_id?: number
          kodepos?: string | null
          last_accesed_at?: string | null
          lat?: string | null
          long?: string | null
          nik?: string
          nik_unique_id?: string
          tanggal_lahir?: string
        }
        Relationships: [
          {
            foreignKeyName: "nik_kecamatan_id_fkey"
            columns: ["kecamatan_id"]
            isOneToOne: false
            referencedRelation: "kecamatan"
            referencedColumns: ["id"]
          },
        ]
      }
      page_counter: {
        Row: {
          count: number
          created_at: string
          updated_at: string | null
          url: string
          user_agent: string | null
        }
        Insert: {
          count: number
          created_at?: string
          updated_at?: string | null
          url: string
          user_agent?: string | null
        }
        Update: {
          count?: number
          created_at?: string
          updated_at?: string | null
          url?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      provinsi: {
        Row: {
          id: number
          nama: string
        }
        Insert: {
          id: number
          nama: string
        }
        Update: {
          id?: number
          nama?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_page_counter: {
        Args: { link: string }
        Returns: undefined
      }
    }
    Enums: {
      jenis_kelamin: "pria" | "wanita"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      jenis_kelamin: ["pria", "wanita"],
    },
  },
} as const
